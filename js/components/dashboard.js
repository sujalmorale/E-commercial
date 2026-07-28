/* ==========================================================================
   AMAZON CLONE - USER DASHBOARD & PROFILE MANAGEMENT
   ========================================================================== */

function renderDashboardPage() {
  const user = window.store.currentUser;

  if (!user) {
    return `<div class="container" style="padding:40px; text-align:center;"><h2>Please sign in to view your account dashboard.</h2><button class="btn-amazon-primary" onclick="window.location.hash='#auth'">Sign In</button></div>`;
  }

  return `
    <div class="container animate-fade-in">
      <h1 style="font-size:26px; font-weight:700; margin:24px 0 16px 0;">Your Account</h1>

      <div class="dashboard-layout">
        <!-- Sidebar Navigation -->
        <div class="dashboard-sidebar">
          <div class="dashboard-menu-item active" onclick="switchDashboardTab('profile')">👤 Your Profile</div>
          <div class="dashboard-menu-item" onclick="window.location.hash='#orders'">📦 Your Orders</div>
          <div class="dashboard-menu-item" onclick="switchDashboardTab('addresses')">🏠 Saved Addresses</div>
          <div class="dashboard-menu-item" onclick="switchDashboardTab('security')">🔒 Login & Security</div>
        </div>

        <!-- Content Area -->
        <div class="dashboard-content" id="dashboard-tab-content">
          ${renderProfileTab(user)}
        </div>
      </div>
    </div>
  `;
}

function renderProfileTab(user) {
  return `
    <h2 style="font-size:20px; font-weight:700; margin-bottom:20px;">Profile Information</h2>
    <form onsubmit="event.preventDefault(); alert('Profile updated successfully!');">
      <div class="form-group">
        <label>Your Name</label>
        <input type="text" class="form-control" value="${user.name}" style="max-width:400px;" required />
      </div>
      <div class="form-group">
        <label>Email Address</label>
        <input type="email" class="form-control" value="${user.email}" style="max-width:400px;" required />
      </div>
      <div class="form-group">
        <label>Account Role</label>
        <input type="text" class="form-control" value="${user.role.toUpperCase()}" style="max-width:400px; background:#eee;" disabled />
      </div>
      <button type="submit" class="btn-amazon-primary" style="margin-top:12px;">Save Changes</button>
    </form>
  `;
}

function switchDashboardTab(tab) {
  const content = document.getElementById('dashboard-tab-content');
  const user = window.store.currentUser;
  if (!content || !user) return;

  if (tab === 'profile') {
    content.innerHTML = renderProfileTab(user);
  } else if (tab === 'addresses') {
    content.innerHTML = `
      <h2 style="font-size:20px; font-weight:700; margin-bottom:20px;">Your Addresses</h2>
      <div style="display:grid; grid-template-columns:repeat(auto-fill, minmax(240px, 1fr)); gap:16px;">
        <div style="border:2px dashed #ccc; border-radius:8px; height:150px; display:flex; flex-direction:column; align-items:center; justify-content:center; cursor:pointer; color:#777;" onclick="alert('Add new address modal opened')">
          <span style="font-size:32px;">+</span>
          <span>Add Address</span>
        </div>
        ${(user.addresses || []).map(a => `
          <div style="border:1px solid #ccc; border-radius:8px; padding:16px; position:relative;">
            ${a.isDefault ? `<span class="badge-deal" style="background:#067d62; position:absolute; top:12px; right:12px;">Default</span>` : ''}
            <strong>${a.name}</strong>
            <p style="font-size:13px; color:#555; margin-top:8px;">${a.street}<br/>${a.city}, ${a.state} ${a.zip}<br/>${a.country}</p>
          </div>
        `).join('')}
      </div>
    `;
  } else if (tab === 'security') {
    content.innerHTML = `
      <h2 style="font-size:20px; font-weight:700; margin-bottom:20px;">Login & Security Settings</h2>
      <form onsubmit="event.preventDefault(); alert('Password updated successfully!');">
        <div class="form-group">
          <label>Current Password</label>
          <input type="password" class="form-control" style="max-width:400px;" required />
        </div>
        <div class="form-group">
          <label>New Password</label>
          <input type="password" class="form-control" style="max-width:400px;" required />
        </div>
        <div class="form-group">
          <label>Re-enter New Password</label>
          <input type="password" class="form-control" style="max-width:400px;" required />
        </div>
        <button type="submit" class="btn-amazon-primary">Update Password</button>
      </form>
    `;
  }
}

window.switchDashboardTab = switchDashboardTab;
