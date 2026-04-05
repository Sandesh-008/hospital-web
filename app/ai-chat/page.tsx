import Chatbot from "@/components/Chatbot"
import ServiceBanner from "@/components/ServicesPageSections/ServiceBanner"

export default function AIAssistantPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-white ">
      {/* Hero Banner (reuse existing banner) */}
            <ServiceBanner 
            serviceName="AI Assistant"
            description=""/>
      <Chatbot />
      
    </div>
  )
}