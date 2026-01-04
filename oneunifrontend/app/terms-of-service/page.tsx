import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import Link from "next/link"

export default function TermsOfService() {
  return (
    <main className="min-h-screen bg-white dark:bg-slate-950 transition-colors">
      <Header />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <h1 className="text-4xl font-bold mb-8 text-foreground">Terms of Service</h1>
        <div className="prose dark:prose-invert max-w-none text-muted-foreground">
          <p className="mb-6">
            Last updated: {new Date().toLocaleDateString()}
          </p>

          <h2 className="text-2xl font-bold mb-4 text-foreground">1. Acceptance of Terms</h2>
          <p className="mb-6">
            By accessing and using One-University ("the Platform"), you agree to comply with and be bound by these Terms of Service. 
            If you do not agree to these terms, please do not use our services.
          </p>

          <h2 className="text-2xl font-bold mb-4 text-foreground">2. Description of Service</h2>
          <p className="mb-6">
            One-University provides a unified platform for university admissions, allowing students to explore programs, 
            submit applications, and track their admission status. We handle sensitive personal information including but not 
            limited to CNIC, passport numbers, and academic records to facilitate this process.
          </p>

          <h2 className="text-2xl font-bold mb-4 text-foreground">3. User Accounts and Security</h2>
          <p className="mb-6">
            You are responsible for maintaining the confidentiality of your account credentials. 
            We implement industry-standard security measures, including encryption at rest and strict Authentication & Authorization (AuthN & AuthZ) protocols, 
            to protect your data. However, you agree to notify us immediately of any unauthorized use of your account.
          </p>

          <h2 className="text-2xl font-bold mb-4 text-foreground">4. Data Privacy and Security</h2>
          <p className="mb-6">
            We take the security of your data seriously. Sensitive information such as CNIC and passport numbers is treated with the utmost care, 
            encrypted at rest, and accessible only through strict role-based access controls. 
            Please review our <Link href="/privacy-policy" className="text-primary hover:underline">Privacy Policy</Link> for detailed information on how we handle your data.
          </p>

          <h2 className="text-2xl font-bold mb-4 text-foreground">5. User Responsibilities</h2>
          <p className="mb-6">
            You agree to provide accurate, current, and complete information during the registration and application process. 
            You are solely responsible for the authenticity of the documents and information you submit.
          </p>

          <h2 className="text-2xl font-bold mb-4 text-foreground">6. Limitation of Liability</h2>
          <p className="mb-6">
            One-University acts as an intermediary between students and educational institutions. 
            We are not responsible for admission decisions made by universities. 
            To the fullest extent permitted by law, One-University shall not be liable for any indirect, incidental, 
            special, consequential, or punitive damages.
          </p>

          <h2 className="text-2xl font-bold mb-4 text-foreground">7. Changes to Terms</h2>
          <p className="mb-6">
            We reserve the right to modify these terms at any time. We will notify users of any material changes. 
            Your continued use of the platform constitutes your acceptance of such changes.
          </p>

          <h2 className="text-2xl font-bold mb-4 text-foreground">8. Contact Us</h2>
          <p className="mb-6">
            If you have any questions about these Terms, please contact us at support@one-university.com.
          </p>
        </div>
      </div>
      <Footer />
    </main>
  )
}
