/**
 * @fileoverview ConfirmModal - Reusable confirmation window component
 * Used for deletion and other confirmation operations
 */

import React from 'react';
import { createPortal } from 'react-dom';
import { AlertTriangle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';

/**
 * ConfirmModal - Confirmation window component
 * @param {Object} props
 * @param {boolean} props.isOpen - Is modal open?
 * @param {string} props.title - Highlighted title (gold color)
 * @param {string} props.message - Confirmation message
 * @param {Function} props.onConfirm - When the confirm button is clicked
 * @param {Function} props.onCancel - When the cancel button is clicked
 * @param {string} [props.confirmText] - Confirm button text
 * @param {string} [props.cancelText] - Cancel button text
 * @returns {JSX.Element}
 */
const ConfirmModal = ({
    isOpen,
    title,
    message,
    onConfirm,
    onCancel,
    confirmText,
    cancelText
}) => {
    const { t } = useTranslation();

    const finalizedConfirmText = confirmText || t('common.ok');
    const finalizedCancelText = cancelText || t('common.cancel');

    return createPortal(
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
                    onClick={onCancel}
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        className="bg-black/90 border border-gold/30 rounded-lg w-full max-w-sm overflow-hidden shadow-[0_0_30px_rgba(235,254,107,0.1)]"
                        onClick={e => e.stopPropagation()}
                    >
                        <div className="p-8 text-center space-y-4">
                            <AlertTriangle className="text-gold mx-auto mb-2 opacity-80" size={32} />
                            <p className="text-gray-300 font-medium font-cinzel text-lg">
                                {title && <span className="text-gold font-bold">{title}</span>}
                                {title && ' '}
                                {message}
                            </p>
                        </div>

                        {/* Footer */}
                        <div className="p-4 bg-black/40 flex justify-center gap-4 border-t border-gray-800">
                            <button
                                onClick={onCancel}
                                className="px-6 py-2 rounded border border-gray-600 text-gray-400 hover:text-white hover:border-gray-400 transition-colors font-bold text-sm tracking-wider"
                            >
                                {finalizedCancelText}
                            </button>
                            <button
                                onClick={onConfirm}
                                className="px-6 py-2 rounded bg-red-900/30 border border-red-500/50 text-red-200 hover:bg-red-900/50 hover:text-white hover:border-red-400 transition-all font-bold text-sm shadow-[0_0_10px_rgba(220,38,38,0.2)] tracking-wider"
                            >
                                {finalizedConfirmText}
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>,
        document.body
    );
};

export default ConfirmModal;
