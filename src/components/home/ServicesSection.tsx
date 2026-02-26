import { motion } from 'framer-motion';
import { useContent } from '../../context/ContentContext';
import { EditableText, EditableImage } from '../admin/InlineEditor';

const ServicesSection: React.FC = () => {
  const { content } = useContent();
  const services = content.services.items;

  // We expect 3 services based on the design
  const earlyChildhood = services.find(s => s.id === 'early-childhood') || services[0];
  const lowerPrimary = services.find(s => s.id === 'lower-primary') || services[1];
  const upperPrimary = services.find(s => s.id === 'upper-primary') || services[2];

  const ServiceCard = ({ service, index, className = "" }: { service: any, index: number, className?: string }) => (
    <div className={`new-service-card ${className}`}>
      <div className="card-inner">
        <div className="card-image-bg">
          <EditableImage
            contentKey={`services.items.${index}.image`}
            src={service.image}
            alt={service.title}
          />
        </div>
        <div className="card-overlay">
          <div className="card-content-flex">
            <div className="card-title-area">
              <EditableText
                contentKey={`services.items.${index}.title`}
                value={service.title}
                multiline
              />
            </div>
            <div className="card-separator"></div>
            <div className="card-description-area">
              <EditableText
                contentKey={`services.items.${index}.description`}
                value={service.description}
                multiline
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <section className="services-redesign-section" id="offers">
      <div className="services-main-container">
        {/* Centered Section Header on White Background */}
        <motion.div
          className="services-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <span className="section-tag-gold">Services We Offer</span>
          <h2 className="section-title-dark">
            Education for every stage
          </h2>
          <div className="header-underline-gold">
            <svg width="120" height="8" viewBox="0 0 120 8" fill="none">
              <path d="M2 5.5C30 2 90 2 118 5.5" stroke="#F0AC00" strokeWidth="4" strokeLinecap="round" />
            </svg>
          </div>
        </motion.div>
        <motion.div
          className="services-layout-grid"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-20px" }}
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: {
                staggerChildren: 0.25
              }
            }
          }}
        >
          <div className="services-row-top">
            <motion.div variants={{ hidden: { opacity: 0, y: 40 }, show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } } }} style={{ flex: 1 }}>
              <ServiceCard
                service={earlyChildhood}
                index={services.indexOf(earlyChildhood)}
                className="card-early-childhood"
              />
            </motion.div>
            <motion.div variants={{ hidden: { opacity: 0, y: 40 }, show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } } }} style={{ flex: 1 }}>
              <ServiceCard
                service={lowerPrimary}
                index={services.indexOf(lowerPrimary)}
                className="card-lower-primary"
              />
            </motion.div>
          </div>
          <motion.div className="services-row-bottom" variants={{ hidden: { opacity: 0, y: 40 }, show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } } }}>
            <ServiceCard
              service={upperPrimary}
              index={services.indexOf(upperPrimary)}
              className="card-upper-primary"
            />
          </motion.div>
        </motion.div>
      </div>

      <style>{`
        .services-redesign-section {
          padding: 48px 0;
          background: #fff;
          display: flex;
          justify-content: center;
        }

        .services-main-container {
          width: 100%;
          max-width: 1280px;
          padding: 0 24px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 64px;
        }

        .services-header {
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .section-tag-gold {
          color: #9F691F;
          font-family: 'Inter', sans-serif;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 2px;
          font-size: 14px;
          margin-bottom: 12px;
        }

        .section-title-dark {
          font-size: 48px;
          color: #422006;
          font-family: 'Instrument Sans', sans-serif;
          font-weight: 800;
          margin: 0;
        }

        .header-underline-gold {
          margin-top: -5px;
        }

        .wavy-divider {
          width: 100%;
          display: flex;
          justify-content: center;
        }

        .wavy-divider svg {
          width: 100%;
          height: auto;
          max-width: 1068px;
        }

        .services-layout-grid {
          width: 100%;
          max-width: 1068px;
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .services-row-top {
          display: flex;
          gap: 24px;
          width: 100%;
        }

        .card-early-childhood {
          flex: 1;
        }

        .card-lower-primary {
          flex: 1;
        }

        .services-row-bottom {
          width: 100%;
        }

        .new-service-card {
          background: white;
          border-radius: 24px;
          padding: 10px;
          box-shadow: 0px 4px 4px 0px rgba(0,0,0,0.25);
          outline: 1px solid #F4F4F5; /* zinc-100 */
          height: 275px;
          overflow: hidden;
        }

        .card-inner {
          position: relative;
          width: 100%;
          height: 100%;
          border-radius: 6px;
          overflow: hidden;
        }

        .card-image-bg {
          position: absolute;
          inset: 0;
          z-index: 0;
        }

        .card-image-bg img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .card-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(255,255,255,0) 15%, rgba(255,255,255,1) 80%);
          z-index: 1;
          display: flex;
          align-items: flex-end;
          padding: 16px 24px;
        }

        .card-content-flex {
          display: flex;
          align-items: center;
          gap: 28px;
          width: 100%;
        }

        .card-title-area {
          flex: 0 0 160px;
          color: #2A1409;
          font-size: 19px;
          font-family: 'Inter', sans-serif;
          font-weight: 600;
          line-height: 1.2;
        }

        .card-separator {
          width: 1px;
          height: 48px;
          background: #2A1409;
          flex-shrink: 0;
        }

        .card-description-area {
          flex: 1;
          color: #2A1409;
          font-size: 14px;
          font-family: 'Inter', sans-serif;
          font-weight: 400;
          line-height: 1.4;
        }

        /* Responsive state */
        @media (max-width: 1024px) {
          .services-main-container {
            gap: 40px;
          }

          .services-row-top {
            flex-direction: column;
            gap: 24px;
          }
          
          .card-early-childhood, .card-lower-primary {
            flex: none;
            width: 100%;
          }

          .new-service-card {
            height: 320px;
          }

          .card-overlay {
            background: linear-gradient(to bottom, rgba(42, 20, 9, 0) 0%, rgba(42, 20, 9, 0.8) 100%);
            padding: 24px;
          }

          .card-content-flex {
             flex-direction: column;
             align-items: flex-start;
             gap: 12px;
          }

          .card-separator {
            width: 40px;
            height: 2px;
            background: #F0AC00;
          }
          
          .card-title-area {
            flex: none;
            width: 100%;
            color: white;
            font-size: 24px;
          }

          .card-description-area {
            color: rgba(255, 255, 255, 0.9);
            font-size: 15px;
          }
        }
      `}</style>
    </section>
  );
};

export default ServicesSection;
