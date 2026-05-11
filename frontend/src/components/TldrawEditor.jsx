// frontend/src/components/TldrawEditor.jsx
import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react'
import { Tldraw, getSnapshot, loadSnapshot } from 'tldraw'
import 'tldraw/tldraw.css'

export const TldrawEditor = forwardRef(function TldrawEditor({ initialData, onSave }, ref) {
  const editorRef = useRef(null)

  const getSnapshotData = useCallback(() => {
    if (!editorRef.current) return null

    const snapshot = getSnapshot(editorRef.current.store)
    return JSON.stringify(snapshot)
  }, [])

  useImperativeHandle(ref, () => ({
    getSnapshotData
  }), [getSnapshotData])

  const handleMount = useCallback(
    (editor) => {
      editorRef.current = editor

      if (!initialData || initialData === '[object Object]') return

      try {
        const snapshot = typeof initialData === 'string' ? JSON.parse(initialData) : initialData
        loadSnapshot(editor.store, snapshot)
      } catch (error) {
        console.warn('Failed to load drawing snapshot:', error)
      }
    },
    [initialData]
  )

  const handleSave = useCallback(() => {
    const snapshotData = getSnapshotData()
    if (!snapshotData) return
    onSave?.(snapshotData)
  }, [getSnapshotData, onSave])

  return (
    <div style={{ width: '100%', height: '600px' }} className="border border-white/15 rounded-lg overflow-hidden">
      <Tldraw 
        onMount={handleMount}
        defaultName="Drawing"
      >
        <SaveButton onSave={handleSave} />
      </Tldraw>
    </div>
  )
})

function SaveButton({ onSave }) {
  return (
    <button
      onClick={() => onSave()}
      className="btn btn-primary btn-sm absolute top-4 right-4 z-50"
    >
      Save Drawing
    </button>
  )
}