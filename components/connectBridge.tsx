import { Sheet } from 'tamagui';

export default function ConnectBridge() {
  return (
    <Sheet open={true} zIndex={100_000} animation="medium">
      <Sheet.Overlay />
      <Sheet.Handle />
      <Sheet.Frame></Sheet.Frame>
    </Sheet>
  );
}
