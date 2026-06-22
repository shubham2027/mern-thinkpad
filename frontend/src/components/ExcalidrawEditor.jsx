import { forwardRef, useCallback, useImperativeHandle, useState } from 'react'
import { Excalidraw } from '@excalidraw/excalidraw'
import '@excalidraw/excalidraw/index.css'

export const ExcalidrawEditor = forwardRef(function ExcalidrawEditor({ initialData, onSave }, ref) {
  const [excalidrawAPI, setExcalidrawAPI] = useState(null);

  const getSnapshotData = useCallback(() => {
    if (!excalidrawAPI) return null;
    const elements = excalidrawAPI.getSceneElements();
    return JSON.stringify({ elements });
  }, [excalidrawAPI]);

  useImperativeHandle(ref, () => ({
    getSnapshotData
  }), [getSnapshotData]);

  const handleSave = useCallback(() => {
    const snapshotData = getSnapshotData();
    if (!snapshotData) return;
    onSave?.(snapshotData);
  }, [getSnapshotData, onSave]);

  let parsedData = null;
  if (initialData && initialData !== '[object Object]') {
    try {
      parsedData = typeof initialData === 'string' ? JSON.parse(initialData) : initialData;
    } catch (e) {
      console.warn('Failed to parse Excalidraw initial data', e);
    }
  }

  return (
    <div style={{ width: '100%', height: '600px' }} className="border border-white/15 rounded-lg overflow-hidden relative">
      <Excalidraw 
        excalidrawAPI={(api) => setExcalidrawAPI(api)}
        initialData={parsedData}
      />
      <button
        onClick={handleSave}
        className="btn btn-primary btn-sm absolute top-4 right-4 z-[100]"
      >
        Save Drawing
      </button>
    </div>
  )
})
