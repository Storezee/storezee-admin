import { useState } from 'react';
import AmountEditor from '../AmountEditor';

export default function AmountEditorExample() {
  const [amount, setAmount] = useState<number | null>(1500);

  return (
    <div className="p-6 space-y-6">
      <div>
        <h3 className="text-sm font-medium mb-3">Amount Editor</h3>
        <AmountEditor 
          amount={amount} 
          onSave={(newAmount) => {
            setAmount(parseFloat(newAmount));
            console.log('Amount saved:', newAmount);
          }}
        />
      </div>
      
      <div>
        <h3 className="text-sm font-medium mb-3">Empty Amount</h3>
        <AmountEditor 
          amount={null} 
          onSave={(newAmount) => console.log('Amount saved:', newAmount)}
        />
      </div>
    </div>
  );
}
