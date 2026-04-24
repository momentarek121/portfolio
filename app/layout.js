export const metadata = { title: 'Momen Tarek — Designer', description: 'Brand Identity · UI/UX · Social Media' }
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;500;700;800&family=DM+Sans:opsz,wght@9..40,300;9..40,400&family=Cairo:wght@300;400;600;700;900&display=swap" rel="stylesheet" />
      </head>
      <body style={{margin:0,padding:0,background:'#0A0A0A',color:'#F0EDE8'}}>{children}</body>
    </html>
  )
}
