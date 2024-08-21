import React, { useState, useRef, useEffect } from 'react';
import '../../assets/css/Console.css';

const Console = ({ logs, addLog }) => {
    const [isDragging, setIsDragging] = useState(false);
    const [isResizing, setIsResizing] = useState(false);
    const [startDragOffset, setStartDragOffset] = useState({ x: 0, y: 0 });
    const [startResizeOffset, setStartResizeOffset] = useState({ x: 0, y: 0 });
    const [size, setSize] = useState({ width: 300, height: 200 });
    const consoleRef = useRef(null);
    const consoleBodyRef = useRef(null); // Ref for the console body
  
    const handleMouseDown = (e) => {
      if (e.target.classList.contains('resize-handle')) {
        setIsResizing(true);
        setStartResizeOffset({
          x: e.clientX,
          y: e.clientY,
        });
      } else {
        setIsDragging(true);
        setStartDragOffset({
          x: e.clientX - consoleRef.current.getBoundingClientRect().left,
          y: e.clientY - consoleRef.current.getBoundingClientRect().top,
        });
      }
    };
  
    const handleMouseMove = (e) => {
      if (isDragging) {
        const x = e.clientX - startDragOffset.x;
        const y = e.clientY - startDragOffset.y;
        consoleRef.current.style.left = `${x}px`;
        consoleRef.current.style.top = `${y}px`;
      } else if (isResizing) {
        const newWidth = Math.max(e.clientX - consoleRef.current.getBoundingClientRect().left, 100);
        const newHeight = Math.max(e.clientY - consoleRef.current.getBoundingClientRect().top, 100);
        setSize({ width: newWidth, height: newHeight });
      }
    };
  
    const handleMouseUp = () => {
      setIsDragging(false);
      setIsResizing(false);
    };
  
    useEffect(() => {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
  
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
      };
    }, [isDragging, isResizing]);
  
    useEffect(() => {
      // Scroll to the bottom when new logs are added
      if (consoleBodyRef.current) {
        consoleBodyRef.current.scrollTop = consoleBodyRef.current.scrollHeight;
      }
    }, [logs]);
  
    
  
    return (
      <div
        className="draggable-console"
        ref={consoleRef}
        style={{ width: `${size.width}px`, height: `${size.height}px` }}
        onMouseDown={handleMouseDown}
      >
        <div className="console-header">
          Console
          <div
            className="resize-handle"
            onMouseDown={(e) => {
              e.stopPropagation(); // Prevent the event from bubbling up and triggering dragging
              handleMouseDown(e);
            }}
          />
        </div>
        <div className="console-body" ref={consoleBodyRef}>
          {logs.map((log, index) => (
            <div key={index} className="console-log">
              {log}
            </div>
          ))}
        </div>
        <button onClick={() => addLog('New log message')}>Add Log</button>
      </div>
    );
  };
  

export default Console;
