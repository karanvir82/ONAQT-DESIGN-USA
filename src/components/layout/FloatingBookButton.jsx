import { MessageSquare } from 'lucide-react';
import { whatsappLink } from '../../config/site';
import '../../styles/FloatingBookButton.css';

const WA_LINK = whatsappLink(
  'Hi Satya Jewellers, I would like to enquire about your jewellery collections. Please assist me.'
);

export default function FloatingBookButton() {
  return (
    <a
      className="fbb"
      href={WA_LINK}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contact Satya Jewellers on WhatsApp"
    >
      <MessageSquare size={18} />
      <span className="fbb-label">WhatsApp Us</span>
    </a>
  );
}
