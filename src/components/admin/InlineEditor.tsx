import React, { useState, useRef, useEffect } from 'react';
import { Type, ImageIcon, Check, X } from 'lucide-react';
import { useContent } from '../../context/ContentContext';

interface EditableTextProps {
    contentKey: string;
    value: string;
    className?: string;
    multiline?: boolean;
}

export const EditableText: React.FC<EditableTextProps> = ({ contentKey, value, className, multiline }) => {
    const { editMode, updateContent } = useContent();
    const [isEditing, setIsEditing] = useState(false);
    const [tempValue, setTempValue] = useState(value);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setTempValue(value);
    }, [value]);

    if (!editMode) {
        return <span className={className}>{value}</span>;
    }

    const handleBlur = () => {
        setIsEditing(false);
        updateContent(contentKey, tempValue);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !multiline) {
            handleBlur();
        }
        if (e.key === 'Escape') {
            setTempValue(value);
            setIsEditing(false);
        }
    };

    return (
        <div
            className={`editable-text-container ${className} ${isEditing ? 'is-editing' : ''}`}
            onClick={() => !isEditing && setIsEditing(true)}
            ref={containerRef}
        >
            {isEditing ? (
                multiline ? (
                    <textarea
                        value={tempValue}
                        onChange={(e) => setTempValue(e.target.value)}
                        onBlur={handleBlur}
                        onKeyDown={handleKeyDown}
                        autoFocus
                        rows={4}
                    />
                ) : (
                    <input
                        type="text"
                        value={tempValue}
                        onChange={(e) => setTempValue(e.target.value)}
                        onBlur={handleBlur}
                        onKeyDown={handleKeyDown}
                        autoFocus
                    />
                )
            ) : (
                <>
                    {value}
                    <div className="edit-indicator">
                        <Type size={12} />
                    </div>
                </>
            )}

            <style>{`
        .editable-text-container {
          position: relative;
          cursor: pointer;
          min-width: 50px;
          min-height: 1.2em;
          border-radius: 4px;
          transition: all 0.2s ease;
        }

        .editable-text-container:hover {
          background: rgba(var(--primary-hsl), 0.05);
          outline: 1px dashed var(--primary);
        }

        .edit-indicator {
          position: absolute;
          top: -10px;
          right: -10px;
          background: var(--primary);
          color: #fff;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity 0.2s;
          pointer-events: none;
        }

        .editable-text-container:hover .edit-indicator {
          opacity: 1;
        }

        .editable-text-container input, 
        .editable-text-container textarea {
          width: 100%;
          background: transparent;
          border: 2px solid var(--secondary);
          color: inherit;
          font: inherit;
          padding: 4px 8px;
          border-radius: 4px;
        }
      `}</style>
        </div>
    );
};

interface EditableImageProps {
    contentKey: string;
    src: string;
    className?: string;
    alt?: string;
}

export const EditableImage: React.FC<EditableImageProps> = ({ contentKey, src, className, alt }) => {
    const { editMode, updateContent } = useContent();
    const [showInput, setShowInput] = useState(false);
    const [tempSrc, setTempSrc] = useState(src || "https://images.unsplash.com/photo-1549488344-cbb6c34ce08b?q=80&w=1200&auto=format&fit=crop");

    useEffect(() => {
        setTempSrc(src || "https://images.unsplash.com/photo-1549488344-cbb6c34ce08b?q=80&w=1200&auto=format&fit=crop");
    }, [src]);

    const displaySrc = src || "https://images.unsplash.com/photo-1549488344-cbb6c34ce08b?q=80&w=1200&auto=format&fit=crop";

    if (!editMode) {
        return <img src={displaySrc} className={className} alt={alt} />;
    }

    const handleSave = () => {
        updateContent(contentKey, tempSrc);
        setShowInput(false);
    };

    return (
        <div className={`editable-image-container ${className}`}>
            <img src={displaySrc} alt={alt} className={className} />
            <div className="image-edit-overlay">
                <button className="edit-img-btn" onClick={() => setShowInput(true)}>
                    <ImageIcon size={24} />
                    Change Image
                </button>
            </div>

            {showInput && (
                <div className="image-url-modal">
                    <div className="modal-content glass">
                        <h4>Update Image URL</h4>
                        <input
                            type="text"
                            value={tempSrc}
                            onChange={(e) => setTempSrc(e.target.value)}
                            placeholder="Paste Unsplash URL here..."
                        />
                        <div className="modal-actions">
                            <button onClick={handleSave} className="btn-save"><Check size={18} /> Save</button>
                            <button onClick={() => setShowInput(false)} className="btn-cancel"><X size={18} /> Cancel</button>
                        </div>
                    </div>
                </div>
            )}

            <style>{`
        .editable-image-container {
          position: relative;
          width: 100%;
          height: 100%;
        }

        .image-edit-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0,0,0,0.4);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity 0.3s;
          z-index: 5;
        }

        .editable-image-container:hover .image-edit-overlay {
          opacity: 1;
        }

        .edit-img-btn {
          background: var(--white);
          color: var(--primary);
          padding: 12px 24px;
          border-radius: var(--radius-full);
          font-weight: 700;
          display: flex;
          align-items: center;
          gap: 10px;
          border: none;
          cursor: pointer;
        }

        .image-url-modal {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: rgba(0,0,0,0.8);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 10000;
        }

        .modal-content {
          padding: 30px;
          border-radius: var(--radius-lg);
          width: 500px;
          max-width: 90%;
        }

        .modal-content h4 { margin-bottom: 20px; color: var(--primary); }
        .modal-content input {
          width: 100%;
          padding: 12px;
          border: 1px solid #ddd;
          border-radius: 8px;
          margin-bottom: 20px;
        }

        .modal-actions { display: flex; gap: 10px; }
        .btn-save { background: var(--primary); color: #fff; flex: 1; display: flex; align-items: center; justify-content: center; gap: 8px; padding: 12px; border-radius: 8px; }
        .btn-cancel { background: #eee; color: #666; flex: 1; display: flex; align-items: center; justify-content: center; gap: 8px; padding: 12px; border-radius: 8px; }
      `}</style>
        </div>
    );
};
