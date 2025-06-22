export default function Footer() {
  return (
    <footer style={{
      width: '100%',
      background: '#f7f7fa',
      borderTop: '1px solid #e0e0e0',
      padding: '1.5rem 0',
      textAlign: 'center',
      color: '#888',
      fontSize: 16,
      marginTop: 'auto',
    }}>
      &copy; {new Date().getFullYear()} ZCCS Club. All rights reserved.
    </footer>
  );
} 