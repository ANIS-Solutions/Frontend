// 'use client';



// export default function NotificationButton() {
//   const { token, error, requestPermission } = useNotifications();

//   return (
//     <div>
//       <button onClick={requestPermission}>
//         {token ? '✅ Notifications Enabled' : '🔔 Enable Notifications'}
//       </button>
//       {error && <p style={{ color: 'red' }}>{error}</p>}
//       {token && <p style={{ fontSize: 12 }}>Token: {token}</p>}
//     </div>
//   );
// }