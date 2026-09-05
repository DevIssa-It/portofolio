'use client'

import { useState, useEffect, useCallback } from 'react'
import {
  getCertifications,
  createCertification,
  updateCertification,
  deleteCertification,
} from '@/lib/services/certification.service'
import { Certification, CreateCertificationInput } from '@/types/certification'
import { sortChronologically } from '@/lib/utils/date-sorter'

export function useCertificationsData(isAuthenticated: boolean) {
  const [certifications, setCertifications] = useState<Certification[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingCert, setEditingCert] = useState<Certification | null>(null)
  const [itemToDelete, setItemToDelete] = useState<string | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)

  const loadData = useCallback(async () => {
    try {
      setLoading(true)
      const res = await getCertifications()
      if (res.success && res.data) setCertifications(sortChronologically(res.data))
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadData()
  }, [loadData])

  const confirmDelete = async () => {
    if (!itemToDelete) return
    setIsDeleting(true)
    try {
      const res = await deleteCertification(itemToDelete)
      if (res.success) setCertifications((prev) => prev.filter((c) => c.id !== itemToDelete))
      setItemToDelete(null)
    } finally {
      setIsDeleting(false)
    }
  }

  const handleSave = async (data: CreateCertificationInput & { id?: string }) => {
    if (data.id) {
      const res = await updateCertification(data as Certification)
      if (res.success && res.data) {
        setCertifications((prev) =>
          sortChronologically(prev.map((c) => (c.id === res.data!.id ? res.data! : c)))
        )
      }
    } else {
      const res = await createCertification(data)
      if (res.success && res.data) {
        setCertifications((prev) => sortChronologically([...prev, res.data!]))
      }
    }
    setShowForm(false)
    setEditingCert(null)
  }

  return {
    certifications,
    loading,
    showForm,
    editingCert,
    setShowForm,
    setEditingCert,
    itemToDelete,
    isDeleting,
    handleDelete: (id: string) => setItemToDelete(id),
    confirmDelete,
    cancelDelete: () => setItemToDelete(null),
    handleSave,
  }
}
