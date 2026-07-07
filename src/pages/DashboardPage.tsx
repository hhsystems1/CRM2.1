import { useAuth } from '../contexts/AuthContext';
import Header from '../components/Header';
import ValueBar from '../components/ValueBar';
import ManufacturerDashboard from '../components/cards/ManufacturerDashboard';
import DistributorPortal from '../components/cards/DistributorPortal';
import CustomerPortal from '../components/cards/CustomerPortal';
import AIKnowledgeAssistant from '../components/cards/AIKnowledgeAssistant';
import FunnelCustomerJourney from '../components/cards/FunnelCustomerJourney';
import ContentEngine from '../components/cards/ContentEngine';
import InternalKnowledgeBase from '../components/cards/InternalKnowledgeBase';
import SupportTicketSystem from '../components/cards/SupportTicketSystem';
import SocialMediaStudio from '../components/cards/SocialMediaStudio';
import FormSubmissionInbox from '../components/cards/FormSubmissionInbox';

export default function DashboardPage() {
  const { profile, signOut, organization } = useAuth();
  const role = profile?.role;

  const isAdmin = role === 'admin';
  const isManufacturer = role === 'manufacturer' || isAdmin;
  const isDistributor = role === 'distributor' || isManufacturer;
  const isCustomer = role === 'customer';
  const isInternal = isManufacturer || isDistributor;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#020914] via-[#06172B] to-[#020914] py-6 px-6">
      <div className="max-w-[1440px] mx-auto">
        <Header userName={profile?.full_name} onSignOut={signOut} role={role} orgName={organization?.name} />
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          {isManufacturer && <ManufacturerDashboard />}
          {isDistributor && <DistributorPortal />}
          {isCustomer && <CustomerPortal />}
          {isInternal && <SocialMediaStudio />}
          {isInternal && <FormSubmissionInbox />}
          <AIKnowledgeAssistant />
          <FunnelCustomerJourney />
          <ContentEngine />
          <InternalKnowledgeBase />
          {!isDistributor && <SupportTicketSystem />}
        </div>
        <ValueBar />
      </div>
    </div>
  );
}
