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
        {/* Wavy Top SVG */}
        <motion.div
          className="wavy-divider"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
          style={{ originX: 0.5 }}
        >
          <svg width="1068" height="32" viewBox="0 0 1068 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1.55176 27.7487L48.6489 7.91828C61.0566 2.69397 75.0469 2.69397 87.4546 7.91828L115.149 19.579C127.557 24.8033 141.547 24.8033 153.955 19.579L181.649 7.91828C194.057 2.69397 208.047 2.69397 220.455 7.91828L248.149 19.579C260.557 24.8033 274.547 24.8033 286.955 19.579L314.649 7.91828C327.057 2.69397 341.047 2.69397 353.455 7.91828L381.149 19.579C393.557 24.8033 407.547 24.8033 419.955 19.579L447.649 7.91828C460.057 2.69397 474.047 2.69397 486.455 7.91828L514.149 19.579C526.557 24.8033 540.547 24.8033 552.955 19.579L580.649 7.91828C593.057 2.69397 607.047 2.69397 619.455 7.91828L647.149 19.579C659.557 24.8033 673.547 24.8033 685.955 19.579L713.649 7.91828C726.057 2.69397 740.047 2.69397 752.455 7.91828L780.149 19.579C792.557 24.8033 806.547 24.8033 818.955 19.579L846.649 7.91828C859.057 2.69397 873.047 2.69397 885.455 7.91828L913.149 19.579C925.557 24.8033 939.547 24.8033 951.955 19.579L979.649 7.91828C992.057 2.69397 1006.05 2.69397 1018.45 7.91828L1065.55 27.7487" stroke="#977330" strokeWidth="8" />
          </svg>
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

        {/* Wavy Bottom SVG */}
        <motion.div
          className="wavy-divider"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
          style={{ originX: 0.5 }}
        >
          <svg width="1068" height="32" viewBox="0 0 1068 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1.55176 27.7485L48.6489 7.91816C61.0566 2.69385 75.0469 2.69385 87.4546 7.91816L115.149 19.5789C127.557 24.8032 141.547 24.8032 153.955 19.5789L181.649 7.91816C194.057 2.69385 208.047 2.69385 220.455 7.91816L248.149 19.5789C260.557 24.8032 274.547 24.8032 286.955 19.5789L314.649 7.91816C327.057 2.69385 341.047 2.69385 353.455 7.91816L381.149 19.5789C393.557 24.8032 407.547 24.8032 419.955 19.5789L447.649 7.91816C460.057 2.69385 474.047 2.69385 486.455 7.91816L514.149 19.5789C526.557 24.8032 540.547 24.8032 552.955 19.5789L580.649 7.91816C593.057 2.69385 607.047 2.69385 619.455 7.91816L647.149 19.5789C659.557 24.8032 673.547 24.8032 685.955 19.5789L713.649 7.91816C726.057 2.69385 740.047 2.69385 752.455 7.91816L780.149 19.5789C792.557 24.8032 806.547 24.8032 818.955 19.579L846.649 7.91828C859.057 2.69397 873.047 2.69397 885.455 7.91828L913.149 19.579C925.557 24.8033 939.547 24.8033 951.955 19.579L979.649 7.91828C992.057 2.69397 1006.05 2.69397 1018.45 7.91828L1065.55 27.7485" stroke="#977330" strokeWidth="8" />
          </svg>
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
