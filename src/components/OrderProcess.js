export default function OrderProcess({ storeInfo }) {
  return (
    <section className="order-process-section" id="order-process">
      <div className="container">
        <div className="section-header center">
          <h2>কিভাবে অর্ডার করবেন?</h2>
          <p className="section-subtitle">মাত্র ৪টি সহজ ধাপে আপনার পছন্দের ফার্নিচার পান</p>
          <div className="section-divider center-div"></div>
        </div>
        <div className="steps-grid">
          <div className="step-item">
            <div className="step-number">০১</div>
            <div className="step-icon-wrap"><i className="fas fa-search"></i></div>
            <h3>পণ্য বাছাই</h3>
            <p>আমাদের বিশাল কালেকশন থেকে আপনার পছন্দের ফার্নিচার বাছাই করুন।</p>
            <div className="step-connector"><i className="fas fa-chevron-right"></i></div>
          </div>
          <div className="step-item">
            <div className="step-number">০২</div>
            <div className="step-icon-wrap"><i className="fab fa-whatsapp"></i></div>
            <h3>WhatsApp মেসেজ</h3>
            <p>পণ্যের নাম, ID ও পরিমাণ সহ আমাদের WhatsApp এ মেসেজ করুন।</p>
            <div className="step-connector"><i className="fas fa-chevron-right"></i></div>
          </div>
          <div className="step-item">
            <div className="step-number">০৩</div>
            <div className="step-icon-wrap"><i className="fas fa-check-circle"></i></div>
            <h3>অর্ডার নিশ্চিত</h3>
            <p>আমাদের টিম আপনার সাথে যোগাযোগ করে অর্ডার নিশ্চিত করবে।</p>
            <div className="step-connector"><i className="fas fa-chevron-right"></i></div>
          </div>
          <div className="step-item">
            <div className="step-number">০৪</div>
            <div className="step-icon-wrap"><i className="fas fa-truck"></i></div>
            <h3>ডেলিভারি পান</h3>
            <p>নির্ধারিত সময়ে আপনার দরজায় পৌঁছে দেওয়া হবে।</p>
          </div>
        </div>
        <div className="order-cta">
          <a href={`https://wa.me/88${storeInfo.whatsapp.number.replace(/-/g, '')}?text=আসসালামু+আলাইকুম%2C+আমি+এখনই+অর্ডার+করতে+চাই।`} className="btn-whatsapp-cta" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-whatsapp"></i> এখনই অর্ডার করুন (WhatsApp)
          </a>
        </div>
      </div>
    </section>
  );
}
