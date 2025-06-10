import { Button, Input, message } from 'antd';
import { useState } from 'react';

export default function Home() {
  const [name, setName] = useState('');

  const handleClick = () => {
    message.success(`Hello, ${name || 'guest'}!`);
  };

  return (
    <div style={{ padding: 40 }}>
      <Input
        placeholder="Enter your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{ width: 300, marginBottom: 20 }}
      />
      <br />
      <Button type="primary" onClick={handleClick}>
        Say Hello
      </Button>
    </div>
  );
}
