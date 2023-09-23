export enum TrackingStatus { 
  Pending = 'Pending',
  InfoReceived = 'Info Received',
  InTransit = 'In Transit',
  OutForDelivery = 'Out for Delivery',
  FailedAttempt = 'Failed Attempt',
  AvailableForPickup = 'To Pick Up',
  Delivered = 'Delivered',
  Exception = 'Exception',
} 