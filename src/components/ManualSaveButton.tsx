import { useState } from 'react';
import { Save, Check } from 'lucide-react';
import { cn } from '../lib/utils';

export const ManualSaveButton = ({
  onSave,
}: {
  onSave: () => void;
}) => {
  const [status, setStatus] = useState<'idle' | 'saved'>('idle');

  const handleSave = () => {
    onSave();
    setStatus('saved');
    setTimeout(() => setStatus('idle'), 2000);
  };

  return (
    <button
      onClick={handleSave}
      title="Save Data Manually"
      className={cn(
        'flex items-center gap-2 rounded-xl px-3 py-1.5 text-[10px] font-black tracking-widest uppercase transition-all',
        status === 'saved'
          ? 'bg-green-100 text-green-700'
          : 'bg-gray-100 text-gray-500 hover:bg-gray-200 hover:text-gray-900',
      )}
    >
      {status === 'saved' ? <Check size={14} /> : <Save size={14} />}
      {status === 'saved' ? 'Saved' : 'Save'}
    </button>
  );
};
