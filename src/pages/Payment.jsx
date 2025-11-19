import React, { useState } from 'react';
import { FaCheck, FaTimes } from 'react-icons/fa';
import PaymentModal from '../components/PaymentModal'; // ⬅️ Importamos la modal de la carpeta components/
import '../styles/Payment.css'; 

export default function Payment() {
  // 1. Estados para la Modal y el Plan Seleccionado
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null); // Guardará el precio/datos del plan
  const [message, setMessage] = useState('');

  // Datos de los planes (para reutilizar y pasar a la modal)
  const plans = [
    { id: 1, price: 19, name: 'Basic', features: [true, true, false, false, false] },
    { id: 2, price: 59, name: 'Pro', features: [true, true, true, false, false] },
    { id: 3, price: 149, name: 'Premium', features: [true, true, true, true, true] },
  ];
  
  // Nombres de las características
  const featureNames = [
    '1 hour individual training', 
    'Personal plan creation', 
    'Diet plan creation', 
    'Free support and advice', 
    'Health monitoring'
  ];

  // 2. Función que se ejecuta al hacer clic en "Get Now"
  const handleSelectPlan = (plan) => {
    // Establece el plan seleccionado y abre la modal
    setSelectedPlan(plan);
    setIsModalOpen(true);
    setMessage(''); 
  };
  
  // 3. Función para enviar datos de pago al backend (Python)
  const handlePaymentSubmit = async (paymentData) => {
    setMessage('Procesando pago...');
    
    // Añadimos el precio y el nombre del plan a los datos de pago
    const dataToSend = { ...paymentData, plan: selectedPlan.name, price: selectedPlan.price };
    console.log('Datos a enviar:', dataToSend);

    try {
      // Llamada al backend de Python (ej: Flask/Django)
      const response = await fetch('/api/process-payment', { 
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataToSend),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(`✅ Pago del plan ${selectedPlan.name} exitoso. Ref: ${data.transaction_id}`);
      } else {
        setMessage(`❌ Error al procesar el pago: ${data.error || 'Fallo desconocido'}`);
      }
    } catch (error) {
      console.error('Error de red o servidor:', error);
      setMessage('❌ Error de conexión con el servidor.');
    } finally {
      setIsModalOpen(false); // Cerrar la modal
      setSelectedPlan(null); // Limpiar el plan
    }
  };

  // 4. Componente de tarjeta de plan reutilizable (para simplificar el JSX)
  const renderPlanCard = (plan) => (
    <div className="Payment-content" key={plan.id}>
      <div className="payment-header">
        <h2>Payment ({plan.name})</h2>
        <span>
          <i>$</i>
          {plan.price}
        </span>
      </div>
      <div className="payment-features">
        {plan.features.map((hasFeature, index) => (
          <div className='payment-features-info' key={index}>
            {hasFeature ? <FaCheck className='icon-check' /> : <FaTimes />}
            <p>{featureNames[index]}</p>
          </div>
        ))}
      </div>
      <div className="payment-button">
        {/* ⬅️ Llama a la función que abre la modal y selecciona el plan */}
        <button onClick={() => handleSelectPlan(plan)}>
          Get Now
        </button>
      </div>
    </div>
  );

  return (
    <section className="Payment">
      {/* Mensaje de feedback */}
      {message && <p className="feedback-message">{message}</p>} 
      
      <div className='Payment-container'>
        {/* Renderiza las tarjetas usando los datos del array 'plans' */}
        {plans.map(renderPlanCard)}
      </div>

      {/* 5. Renderizar la Modal de Pago */}
      {isModalOpen && selectedPlan && (
        <PaymentModal
          onClose={() => {
            setIsModalOpen(false);
            setSelectedPlan(null); // Limpiar al cerrar
          }}
          onSubmit={handlePaymentSubmit}
          // Pasamos los datos del plan a la modal
          planPrice={selectedPlan.price} 
          planName={selectedPlan.name}
        />
      )}
    </section>
  );
}