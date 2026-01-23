'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import styles from './services.module.css';

export default function ServicesPage() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedService, setSelectedService] = useState(null);

  useEffect(() => {
    fetch('/api/hizmetler')
      .then(res => res.json())
      .then(data => {
        setServices(data);
        setLoading(false);
        if (data.length > 0) {
          setSelectedService(data[0]);
        }
      })
      .catch(err => {
        console.error('Error fetching services:', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Yükleniyor...</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.sidebar}>
        <h3 className={styles.sidebarTitle}>Hizmetlerimiz</h3>
        <ul className={styles.sidebarNav}>
          {services.map((service) => (
            <li key={service.id}>
              <a
                href="#"
                className={selectedService && selectedService.id === service.id ? styles.active : ''}
                onClick={(e) => {
                  e.preventDefault();
                  setSelectedService(service);
                }}
              >
                {service.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.content}>
        {selectedService && (
          <>
            <h1 className={styles.title}>{selectedService.name}</h1>
            <div className={styles.textBlock}>
              <p>{selectedService.description}</p>
            </div>
            {(() => {
              const images = JSON.parse(selectedService.images || '[]');
              return images.length > 0 ? (
                <div className={styles.images}>
                  {images.map((img, index) => (
                    <Image key={index} src={img} alt={`${selectedService.name} ${index + 1}`} width={200} height={150} />
                  ))}
                </div>
              ) : null;
            })()}
          </>
        )}
      </div>
    </div>
  );
}
