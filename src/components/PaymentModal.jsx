import React, { useState } from 'react';
// RUTA CORREGIDA: sube un nivel (..) y entra en la carpeta styles/
import '../styles/PaymentModal.css'; 

// Definición de las opciones de pago para el desplegable
const PAYMENT_OPTIONS = [
    { value: 'card', label: '💳 Tarjeta de Crédito/Débito' },
    { value: 'bank_transfer', label: '🏧 Transferencia Bancaria' },
    { value: 'paypal', label: '🅿️ PayPal' },
    { value: 'zelle', label: '🏦 Zelle' },
    { value: 'movil', label: '📱 Pago Móvil' },
    { value: 'cash', label: '💵 Efectivo USD' },
    { value: 'binance', label: '₿ Binance' },
];

const PaymentModal = ({ onClose, onSubmit, planPrice, planName }) => {
    // Inicializa el método seleccionado con el primer valor de la lista o 'card'
    const [selectedMethod, setSelectedMethod] = useState(PAYMENT_OPTIONS[0].value);
    
    const [paymentDetails, setPaymentDetails] = useState({
        invoiceNumber: '', // Carta de Pago (Común)

        cardNumber: '',
        cardHolder: '',
        expiryDate: '',
        cvv: '',
        // Transferencia
        transferRef: '', 
        // Efectivo USD
        cashAmount: '', 
        // Pago Móvil
        movilPhone: '', 
        // Zelle
        zelleEmail: '', 
        // Binance
        binanceRef: '', 
    });

    const handleChange = (e) => {
        // Manejador genérico para todos los campos de entrada
        setPaymentDetails({
            ...paymentDetails,
            [e.target.name]: e.target.value,
        });
    };

    // ELIMINAMOS handleMethodChange y usamos directamente la función del select
    const handleSelectChange = (e) => {
        const newMethod = e.target.value;
        setSelectedMethod(newMethod);
        // Limpiar los detalles específicos del método anterior al cambiar 
        setPaymentDetails(prev => ({ 
            ...prev, 
            cardNumber: '', 
            cardHolder: '', 
            expiryDate: '', 
            cvv: '', 
            transferRef: '',
            cashAmount: '',
            movilPhone: '',
            zelleEmail: '',
            binanceRef: '',
        })); 
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Validaciones de frontend:
        if (!paymentDetails.invoiceNumber) {
            console.error('Por favor, ingresa el número de Carta de Pago.');
            return;
        }

        // Llama a la función 'onSubmit' del componente padre (Payment.jsx) 
        // y le pasa todos los datos recolectados.
        onSubmit({
            plan: planName, 
            price: planPrice, 
            method: selectedMethod,
            details: paymentDetails,
        });
    };

    const renderPaymentForm = () => {
        const { cardNumber, cardHolder, expiryDate, cvv, transferRef, cashAmount, movilPhone, zelleEmail, binanceRef } = paymentDetails;
        
        switch (selectedMethod) {
            case 'cash':
                return (
                    <div className="payment-info-message">
                        <p>El pago en **Efectivo USD** se confirmará en persona durante tu primera sesión de entrenamiento.</p>
                        <label>Monto Entregado (opcional):</label>
                        <input 
                            type="number" 
                            name="cashAmount" 
                            value={cashAmount} 
                            onChange={handleChange} 
                            placeholder={`Monto a pagar: $${planPrice}`}
                        />
                    </div>
                );
            case 'movil':
                return (
                    <div className="payment-info-message">
                        <p>Realiza tu **Pago Móvil** de **${planPrice}** a:</p>
                        <ul>
                            <li>**Banco:** 0105</li>
                            <li>**Teléfono:** 0412-123-4567</li>
                            <li>**C.I.:** V-12.345.678</li>
                        </ul>
                        <label>Número de Teléfono Usado para el Pago (Obligatorio):</label>
                        <input 
                            type="text" 
                            name="movilPhone" 
                            value={movilPhone} 
                            onChange={handleChange} 
                            placeholder="Ej: 04121234567"
                            required
                        />
                    </div>
                );
            case 'zelle':
                return (
                    <div className="payment-info-message">
                        <p>Envía **${planPrice}** a la siguiente cuenta de Zelle:</p>
                        <ul>
                            <li>**Email:** zelle@fitsync.com</li>
                            <li>**Nombre:** FitSync LLC</li>
                        </ul>
                        <label>Tu Correo Electrónico de Zelle (Obligatorio):</label>
                        <input 
                            type="email" 
                            name="zelleEmail" 
                            value={zelleEmail} 
                            onChange={handleChange} 
                            placeholder="tu.email@ejemplo.com"
                            required
                        />
                    </div>
                );
            case 'binance':
                return (
                    <div className="payment-info-message">
                        <p>Transfiere **${planPrice}** (o su equivalente en USDT) a la siguiente ID de pago de Binance:</p>
                        <ul>
                            <li>**Binance Pay ID:** 123456789</li>
                            <li>**Red Preferida:** BEP20 (BNB Smart Chain)</li>
                        </ul>
                        <label>ID de Transacción de Binance (Obligatoria):</label>
                        <input 
                            type="text" 
                            name="binanceRef" 
                            value={binanceRef} 
                            onChange={handleChange} 
                            placeholder="Hash de la transacción (TxID)"
                            required
                        />
                    </div>
                );
            case 'card':
                return (
                    <>
                        <label>Número de Tarjeta:</label>
                        <input 
                            type="text" 
                            name="cardNumber" 
                            value={cardNumber} 
                            onChange={handleChange} 
                            placeholder="1234 5678 9012 3456"
                            required 
                        />
                        <label>Titular de la Tarjeta:</label>
                        <input 
                            type="text" 
                            name="cardHolder" 
                            value={cardHolder} 
                            onChange={handleChange} 
                            placeholder="Nombre Apellido"
                            required 
                        />
                        <div className="card-details-row">
                            <div>
                                <label>Fecha Exp. (MM/AA):</label>
                                <input 
                                    type="text" 
                                    name="expiryDate" 
                                    value={expiryDate} 
                                    onChange={handleChange} 
                                    placeholder="MM/AA"
                                    required 
                                />
                            </div>
                            <div>
                                <label>CVV:</label>
                                <input 
                                    type="text" 
                                    name="cvv" 
                                    value={cvv} 
                                    onChange={handleChange} 
                                    placeholder="123"
                                    required 
                                />
                            </div>
                        </div>
                    </>
                );
            case 'paypal':
                return (
                    <div className="payment-info-message">
                        <p>Al hacer clic en **Confirmar Pago**, serás redirigido a PayPal para completar el pago de **${planPrice}**.</p>
                    </div>
                );
            case 'bank_transfer':
                return (
                    <div className="payment-info-message">
                        <p>Realiza una transferencia bancaria de **${planPrice}** a la siguiente cuenta:</p>
                        <ul>
                            <li>**Banco:** Banco Ficticio</li>
                            <li>**Cuenta:** ES99 0000 1234 5678 9012 3456</li>
                            <li>**Beneficiario:** FitSync S.A.</li>
                        </ul>
                        <label>Referencia de Transferencia (Obligatoria):</label>
                        <input 
                            type="text" 
                            name="transferRef" 
                            value={transferRef} 
                            onChange={handleChange} 
                            placeholder="Referencia de tu banco"
                            required
                        />
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        // Click en el fondo oscuro cierra la modal
        <div className="modal-backdrop" onClick={onClose}>
            {/* Click dentro de la modal NO la cierra */}
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    {/* Muestra el nombre y el precio del plan */}
                    <h2>💸 Pago del Plan {planName} - **${planPrice}**</h2> 
                    <button className="close-button" onClick={onClose}>&times;</button>
                </div>
                
                <form onSubmit={handleSubmit} className="modal-body">
                    
                    {/* 1. Campo de la Carta de Pago (Común a todos los métodos) */}
                    <div className="invoice-section">
                        <label>Número de Carta de Pago:</label>
                        <input 
                            type="text" 
                            name="invoiceNumber" 
                            value={paymentDetails.invoiceNumber} 
                            onChange={handleChange} 
                            required
                            placeholder="Ej: 2025-00123" 
                        />
                        <hr/>
                    </div>

                    {/* 2. Selector de Métodos de Pago: AHORA DESPLEGABLE */}
                    <label htmlFor="paymentMethodSelect">Selecciona el Método de Pago:</label>
                    <select
                        id="paymentMethodSelect"
                        className="method-select" // Nueva clase CSS para el select
                        value={selectedMethod}
                        onChange={handleSelectChange}
                    >
                        {PAYMENT_OPTIONS.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                    
                    {/* 3. Renderiza el formulario específico del método */}
                    <div className="payment-form-area">
                        {renderPaymentForm()}
                    </div>

                    <div className="modal-footer">
                        <button type="submit" disabled={!selectedMethod}>
                            Confirmar Pago (${planPrice})
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default PaymentModal;