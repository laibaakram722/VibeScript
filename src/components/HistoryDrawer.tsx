import React from 'react';
import { GeneratedCaption } from '../types';
import { History, Copy, Check, Trash2, ArrowUpRight } from 'lucide-react';

interface HistoryDrawerProps {
  history: GeneratedCaption[];
  onSelect: (caption: GeneratedCaption) => void;
  onClear: () => void;
  onDeleteOne: (id: string) => void;
}

export const HistoryDrawer: React.FC<HistoryDrawerProps> = ({
  history,
  onSelect,
  onClear,
  onDeleteOne,
}) => {
  const [copiedId, setCopiedId] = React.useState<string | null>(null);

  const handleCopy = async (id: string, text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch {
      // Fallback
    }
  };

  if (history.length === 0) {
    return (
      <div className="bg-neutral-950 border border-neutral-800 rounded-2xl p-5 text-center space-y-2">
        <History className="w-6 h-6 text-neutral-600 mx-auto" />
        <h4 className="text-xs font-bold text-neutral-400 uppercase tracking-wider">No Captions Saved Yet</h4>
        <p className="text-[11px] text-neutral-500">
          Generated viral scripts will automatically appear here for rapid copy and reuse.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-neutral-950 border border-neutral-800 rounded-2xl p-5 shadow-xl space-y-4">
      <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
        <div className="flex items-center gap-2">
          <History className="w-4 h-4 text-white" />
          <h3 className="text-xs font-bold uppercase tracking-wider text-white">
            Script Vault ({history.length})
          </h3>
        </div>

        <button
          type="button"
          onClick={onClear}
          className="text-[11px] text-neutral-500 hover:text-white transition cursor-pointer flex items-center gap-1 font-mono"
        >
          <Trash2 className="w-3 h-3" />
          <span>Clear Vault</span>
        </button>
      </div>

      <div className="space-y-3 max-h-[360px] overflow-y-auto pr-1">
        {history.map((item) => (
          <div
            key={item.id}
            className="p-3.5 rounded-xl bg-black border border-neutral-800 hover:border-neutral-700 transition space-y-2 group"
          >
            <div className="flex items-center justify-between">
              <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase font-bold bg-neutral-900 text-neutral-200 border border-neutral-700">
                {item.platform}
              </span>
              <span className="text-[10px] text-neutral-500 font-mono">
                {new Date(item.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>

            <div
              onClick={() => onSelect(item)}
              className="font-bold text-xs text-white hover:underline transition cursor-pointer truncate"
            >
              {item.hook}
            </div>

            <p className="text-[11px] text-neutral-400 line-clamp-2">
              {item.valueCta}
            </p>

            <div className="flex items-center justify-between pt-1 border-t border-neutral-900">
              <span className="text-[10px] text-neutral-500 truncate max-w-[150px] font-mono">
                {item.tags.join(' ')}
              </span>

              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => handleCopy(item.id, item.fullCaption)}
                  className="px-2 py-1 rounded bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white text-[11px] font-semibold transition cursor-pointer flex items-center gap-1"
                >
                  {copiedId === item.id ? (
                    <>
                      <Check className="w-3 h-3 text-white" />
                      <span className="text-white">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>Copy</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => onSelect(item)}
                  className="p-1 rounded bg-neutral-900 hover:bg-neutral-800 text-neutral-400 hover:text-white transition cursor-pointer"
                  title="Load into Editor & Preview"
                >
                  <ArrowUpRight className="w-3 h-3" />
                </button>

                <button
                  type="button"
                  onClick={() => onDeleteOne(item.id)}
                  className="p-1 rounded text-neutral-600 hover:text-white transition cursor-pointer"
                  title="Remove from Vault"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
