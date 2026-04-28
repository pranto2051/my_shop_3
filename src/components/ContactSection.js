import Link from 'next/link';

export default function ContactSection({ storeInfo }) {
  return (
    <section id="contact" className="contact-section">
      <div className="container">
        <div className="section-header">
          <h2>{storeInfo.contactLabel}</h2>
          <div className="section-divider"></div>
        </div>
        <div className="contact-grid">
          <div className="contact-info-card">
            <div className="contact-logo-area">
              <div className="logo-icon" style={{ color: 'var(--primary)' }}>
                <svg width="50" height="50" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="5" y="28" width="30" height="5" rx="2" fill="currentColor"/>
                  <rect x="8" y="15" width="24" height="14" rx="2" fill="currentColor" opacity="0.8"/>
                  <rect x="10" y="10" width="8" height="8" rx="1" fill="currentColor" opacity="0.6"/>
                  <rect x="22" y="10" width="8" height="8" rx="1" fill="currentColor" opacity="0.6"/>
                  <rect x="8" y="33" width="4" height="6" rx="1" fill="currentColor"/>
                  <rect x="28" y="33" width="4" height="6" rx="1" fill="currentColor"/>
                </svg>
              </div>
              <h3>{storeInfo.name}</h3>
            </div>
            <ul className="contact-details">
              <li><i className="fas fa-map-marker-alt"></i> {storeInfo.showroomAddress.address}</li>
              <li><i className="fas fa-phone"></i> <a href={`tel:${storeInfo.callNumbers.numbers[0].replace(/-/g, '')}`}>{storeInfo.callNumbers.numbers[0]}</a></li>
              <li><i className="fab fa-whatsapp"></i> <a href={`https://wa.me/88${storeInfo.whatsapp.number.replace(/-/g, '')}`}>{storeInfo.whatsapp.number} (WhatsApp)</a></li>
              <li><i className="fas fa-envelope"></i> <a href={`mailto:${storeInfo.email.address}`}>{storeInfo.email.address}</a></li>
              <li><i className="fas fa-clock"></i> {storeInfo.openingHours.schedule[0]}</li>
            </ul>
            <a href={`https://wa.me/88${storeInfo.whatsapp.number.replace(/-/g, '')}?text=আসসালামু+আলাইকুম%2C+আমি+ফার্নিচার+সম্পর্কে+জানতে+চাই।`} className="whatsapp-big-btn" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-whatsapp"></i> WhatsApp এ অর্ডার করুন
            </a>
          </div>
          <div className="contact-map-area">
            <div className="map-placeholder">
              <i className="fas fa-map-marker-alt map-pin-icon"></i>
              <p>{storeInfo.showroomAddress.address.split(',')[0]}</p>
              <span>{storeInfo.name} শোরুম</span>
              <div className="map-streets">
                <div className="street h"></div>
                <div className="street v"></div>
                <div className="street h2"></div>
                <div className="street v2"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
