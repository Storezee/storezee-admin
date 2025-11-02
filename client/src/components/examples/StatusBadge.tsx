import { useState } from 'react';
import StatusBadge from '../StatusBadge';

export default function StatusBadgeExample() {
  const [status, setStatus] = useState('luggage_Stored');

  return (
    <div className="p-6 space-y-6">
      <div>
        <h3 className="text-sm font-medium mb-3">Editable Status</h3>
        <StatusBadge 
          status={status} 
          onStatusChange={(newStatus) => {
            setStatus(newStatus);
            console.log('Status changed to:', newStatus);
          }}
          editable 
        />
      </div>
      
      <div>
        <h3 className="text-sm font-medium mb-3">Status Examples (Read-only)</h3>
        <div className="flex flex-wrap gap-2">
          <StatusBadge status="pending" />
          <StatusBadge status="active" />
          <StatusBadge status="confirmed" />
          <StatusBadge status="pickup" />
          <StatusBadge status="out_for_delivery" />
          <StatusBadge status="luggage_Stored" />
          <StatusBadge status="completed" />
          <StatusBadge status="cancelled" />
        </div>
      </div>
    </div>
  );
}
