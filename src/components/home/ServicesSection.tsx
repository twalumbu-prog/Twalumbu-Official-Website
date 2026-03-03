import { motion } from 'framer-motion';
import { useContent } from '../../context/ContentContext';
import { EditableText, EditableImage } from '../admin/InlineEditor';
import { Baby, BookOpen, Atom, ArrowRight } from 'lucide-react';

const ServicesSection: React.FC = () => {
  const { content } = useContent();
  const services = content.services.items;

  // We expect 3 services based on the design
  const earlyChildhood = services.find(s => s.id === 'early-childhood') || services[0];
  const lowerPrimary = services.find(s => s.id === 'lower-primary') || services[1];
  const upperPrimary = services.find(s => s.id === 'upper-primary') || services[2];

  const getIcon = (id: string) => {
    switch (id) {
      case 'early-childhood': return <Baby className="service-icon" />;
      case 'lower-primary': return <BookOpen className="service-icon" />;
      case 'upper-primary': return <Atom className="service-icon" />;
      default: return <BookOpen className="service-icon" />;
    }
  };

  const ServiceCard = ({ service, index, className = "" }: { service: any, index: number, className?: string }) => (
    <motion.div
      className={`premium-service-card ${className}`}
      whileHover="hover"
      initial="rest"
    >
      <div className="card-image-wrapper">
        <motion.div
          className="card-image-motion"
          variants={{
            rest: { scale: 1 },
            hover: { scale: 1.1 }
          }}
          transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
        >
          <EditableImage
            contentKey={`services.items.${index}.image`}
            src={service.image}
            alt={service.title}
          />
        </motion.div>

        <div className="card-glass-overlay">
          <div className="card-header-flex">
            <div className="icon-badge">
              {getIcon(service.id)}
            </div>
            <div className="title-stack">
              <span className="tiny-tag">Education Stage</span>
              <h3 className="card-main-title">
                <EditableText
                  contentKey={`services.items.${index}.title`}
                  value={service.title}
                />
              </h3>
            </div>
          </div>

          <div className="card-description-box">
            <p className="card-desc-text">
              <EditableText
                contentKey={`services.items.${index}.description`}
                value={service.description}
                multiline
              />
            </p>
            <motion.div
              className="card-action"
              variants={{
                rest: { x: 0, opacity: 0.7 },
                hover: { x: 5, opacity: 1 }
              }}
            >
              <span>Explore Program</span>
              <ArrowRight size={16} />
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );

  return (
    <section className="services-polished-section" id="offers">
      <div className="services-main-container">
        <motion.div
          className="services-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <span className="premium-tag">Services We Offer</span>
          <h2 className="premium-title">
            Exceptional Education for <span>Every Stage</span>
          </h2>
          <div className="title-accent-bar"></div>
        </motion.div>

        <div className="services-grid-redesign">
          <div className="grid-top-row">
            <ServiceCard
              service={earlyChildhood}
              index={services.indexOf(earlyChildhood)}
              className="card-early"
            />
            <ServiceCard
              service={lowerPrimary}
              index={services.indexOf(lowerPrimary)}
              className="card-lower"
            />
          </div>
          <div className="grid-bottom-row">
            <ServiceCard
              service={upperPrimary}
              index={services.indexOf(upperPrimary)}
              className="card-upper"
            />
          </div>
        </div>
      </div>

      <style>{`
        .services-polished-section {
          padding: 100px 0;
          background: #fafaf9; /* warm stone-50 */
          overflow: hidden;
        }

        .services-main-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 24px;
        }

        .services-header {
          text-align: center;
          margin-bottom: 80px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .premium-tag {
          color: #9F691F;
          font-family: 'Inter', sans-serif;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          font-size: 13px;
          margin-bottom: 16px;
          background: rgba(159, 105, 31, 0.1);
          padding: 6px 16px;
          border-radius: 100px;
        }

        .premium-title {
          font-size: 52px;
          color: #2A1409;
          font-family: 'Instrument Sans', sans-serif;
          font-weight: 800;
          line-height: 1.1;
          max-width: 700px;
        }

        .premium-title span {
          color: #F0AC00;
        }

        .title-accent-bar {
          width: 80px;
          height: 4px;
          background: #F0AC00;
          margin-top: 24px;
          border-radius: 2px;
        }

        .services-grid-redesign {
          display: flex;
          flex-direction: column;
          gap: 32px;
        }

        .grid-top-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 32px;
        }

        .premium-service-card {
          position: relative;
          height: 420px;
          border-radius: 32px;
          overflow: hidden;
          background: #fff;
          box-shadow: 0 20px 40px rgba(0,0,0,0.04);
          cursor: pointer;
        }

        /* Large card for bottom row */
        .grid-bottom-row .premium-service-card {
          height: 380px;
        }

        .card-image-wrapper {
          position: relative;
          width: 100%;
          height: 100%;
        }

        .card-image-motion {
          width: 100%;
          height: 100%;
        }

        .card-image-motion img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .card-glass-overlay {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          background: #ffffff;
          border-top: 1px solid #f3f4f6;
          border-radius: 0;
          padding: 32px 24px 24px 24px;
          display: flex;
          flex-direction: column;
          gap: 20px;
          transition: all 0.4s cubic-bezier(0.33, 1, 0.68, 1);
        }

        .premium-service-card:hover .card-glass-overlay {
          background: rgba(255, 255, 255, 1);
          transform: translateY(0);
          box-shadow: 0 -10px 30px rgba(0,0,0,0.05);
        }

        .card-header-flex {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .icon-badge {
          width: 52px;
          height: 52px;
          background: #2A1409;
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #F0AC00;
          flex-shrink: 0;
        }

        .service-icon {
          width: 26px;
          height: 26px;
        }

        .title-stack {
          display: flex;
          flex-direction: column;
        }

        .tiny-tag {
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: #9F691F;
          font-weight: 700;
          margin-bottom: 2px;
        }

        .card-main-title {
          font-size: 22px;
          color: #2A1409;
          font-weight: 700;
          font-family: 'Instrument Sans', sans-serif;
          margin: 0;
        }

        .card-description-box {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .card-desc-text {
          font-size: 15px;
          color: #57534e;
          line-height: 1.6;
          margin: 0;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .card-action {
          display: flex;
          align-items: center;
          gap: 8px;
          color: #2A1409;
          font-weight: 700;
          font-size: 14px;
        }

        @media (max-width: 991px) {
          .premium-title {
            font-size: 42px;
          }
          
          .grid-top-row {
            grid-template-columns: 1fr;
          }

          .premium-service-card {
            height: 480px !important;
          }
          
          /* Ensuring mobile overlay matches desktop refined look */
          .card-glass-overlay {
            padding: 24px 20px 20px 20px;
          }

          .card-desc-text {
            -webkit-line-clamp: 3;
          }
        }

        @media (max-width: 576px) {
          .services-polished-section {
            padding: 60px 0;
          }
          
          .premium-title {
            font-size: 32px;
          }
          
          .card-main-title {
            font-size: 19px;
          }
        }
      `}</style>
    </section>
  );
};

export default ServicesSection;
