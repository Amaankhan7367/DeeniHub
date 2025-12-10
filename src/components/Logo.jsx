import React from 'react'
import './Logo.css'

function Logo({ width = '140px' }) {
  return (
    <div className="deeni-logo" style={{ width }}>
      <span className="logo-icon">ﷺ</span>
      <span className="logo-text">Deeni<span>Hub</span></span>
    </div>
  )
}

export default Logo