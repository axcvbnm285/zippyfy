"use client";

import { Plus, Minus, Trash2, ShoppingBasket } from "lucide-react";

interface CartItemType {
  id: string;
  name: string;
  price: number;
  unit: string;
  qty: number;
}

interface Props {
  item: CartItemType;
  onQtyChange: (id: string, qty: number) => void;
  onRemove: (id: string) => void;
}

export default function CartItem({ item, onQtyChange, onRemove }: Props) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-slate-100 bg-white p-3 shadow-sm">
      <div className="flex size-16 shrink-0 items-center justify-center rounded-xl bg-slate-50">
        <ShoppingBasket size={28} className="text-slate-200" />
      </div>
      <div className="flex flex-1 flex-col gap-0.5 min-w-0">
        <p className="truncate text-sm font-semibold text-slate-800">{item.name}</p>
        <p className="text-xs text-slate-400">per {item.unit}</p>
        <p className="text-sm font-bold text-slate-900">₹{item.price * item.qty}</p>
      </div>
      <div className="flex flex-col items-end gap-2">
        <button onClick={() => onRemove(item.id)} className="text-slate-300 transition hover:text-red-500">
          <Trash2 size={15} />
        </button>
        <div className="flex items-center gap-1.5 rounded-xl border border-slate-200 px-2 py-1">
          <button onClick={() => onQtyChange(item.id, Math.max(1, item.qty - 1))} className="text-slate-500 hover:text-slate-800">
            <Minus size={13} />
          </button>
          <span className="w-5 text-center text-sm font-bold text-slate-800">{item.qty}</span>
          <button onClick={() => onQtyChange(item.id, item.qty + 1)} className="text-slate-500 hover:text-slate-800">
            <Plus size={13} />
          </button>
        </div>
      </div>
    </div>
  );
}
