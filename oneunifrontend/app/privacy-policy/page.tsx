import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-white dark:bg-slate-950 transition-colors">
      <Header />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <h1 className="text-4xl font-bold mb-8 text-foreground">Privacy Policy</h1>
        <div className="prose dark:prose-invert max-w-none text-muted-foreground">
          <p className="mb-6">
            Last updated: {new Date().toLocaleDateString()}
          </p>

          <p className="mb-6">
            At One-University, we value your privacy and are committed to protecting your personal data. 
            This Privacy Policy explains how we collect, use, and safeguard your information when you use our platform.
          </p>

          <h2 className="text-2xl font-bold mb-4 text-foreground">1. Information We Collect</h2>
          <p className="mb-4">
            We collect information necessary to facilitate the university admission process. This includes:
          </p>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li><strong>Personal Identity Information:</strong> Name, Date of Birth, Gender.</li>
            <li><strong>Sensitive Government IDs:</strong> Computerized National Identity Card (CNIC) numbers, Passport numbers.</li>
            <li><strong>Contact Details:</strong> Email address, phone number, residential address.</li>
            <li><strong>Academic Records:</strong> Transcripts, certificates, and other educational documents.</li>
          </ul>

          <h2 className="text-2xl font-bold mb-4 text-foreground">2. How We Use Your Information</h2>
          <p className="mb-6">
            Your data is used solely for the purpose of:
          </p>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li>Processing your university applications.</li>
            <li>Verifying your identity as required by educational institutions.</li>
            <li>Communicating with you regarding your application status.</li>
            <li>Complying with legal and regulatory requirements.</li>
          </ul>

          <h2 className="text-2xl font-bold mb-4 text-foreground">3. Data Security Measures</h2>
          <p className="mb-6">
            We employ robust security measures to protect your sensitive data:
          </p>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li><strong>Encryption at Rest:</strong> All sensitive data, including CNIC and Passport numbers, is encrypted in our databases using industry-standard encryption algorithms (e.g., AES-256).</li>
            <li><strong>Authentication & Authorization (AuthN & AuthZ):</strong> Access to data is strictly controlled via multi-factor authentication and granular role-based access controls (RBAC). Only authorized personnel and the specific universities you apply to can access your data.</li>
            <li><strong>Secure Transmission:</strong> All data transmitted between your device and our servers is encrypted using TLS/SSL protocols.</li>
          </ul>

          <h2 className="text-2xl font-bold mb-4 text-foreground">4. Information Sharing</h2>
          <p className="mb-6">
            We do not sell your personal information. We share your data only with:
          </p>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li><strong>Universities and Educational Institutions:</strong> Specifically those you choose to apply to.</li>
            <li><strong>Service Providers:</strong> Third-party vendors who assist in platform operations (subject to strict data processing agreements).</li>
            <li><strong>Legal Authorities:</strong> If required by law or to protect our rights and safety.</li>
          </ul>

          <h2 className="text-2xl font-bold mb-4 text-foreground">5. Your Data Rights</h2>
          <p className="mb-6">
            Depending on your jurisdiction, you may have the right to access, correct, or request deletion of your personal data. 
            Please contact us if you wish to exercise these rights.
          </p>

          <h2 className="text-2xl font-bold mb-4 text-foreground">6. Google OAuth Compliance</h2>
          <p className="mb-6">
            Our use of information received from Google APIs will adhere to the Google API Services User Data Policy, including the Limited Use requirements.
          </p>

          <h2 className="text-2xl font-bold mb-4 text-foreground">7. Contact Us</h2>
          <p className="mb-6">
            If you have any questions about this Privacy Policy or our data practices, please contact our Data Protection Officer at privacy@one-university.com.
          </p>
        </div>
      </div>
      <Footer />
    </main>
  )
}
