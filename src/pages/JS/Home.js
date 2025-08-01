// Real-time data simulation
class DashboardManager {
  constructor() {
    this.isRunning = true;
    this.metricsData = {
      responseTime: 45,
      uptime: 99.9,
      cpuUsage: 23,
      ramUsage: 4.2,
      ramTotal: 16,
      diskUsage: 127,
      diskTotal: 500,
      cacheHitRate: 94.2,
      activeConnections: 1247,
      requestsPerMin: 8934,
      bandwidth: 2.3,
      failedAttempts: 0,
    };
    this.init();
  }

  init() {
    this.setupNavigation();
    this.startRealTimeUpdates();
    this.setupInteractiveElements();
    this.animateProgressBars();
    this.setupNotifications();
  }

  setupNavigation() {
    const navItems = document.querySelectorAll(".nav-item");
    navItems.forEach((item) => {
      item.addEventListener("click", (e) => {
        // Remove active class from all items
        navItems.forEach((nav) => nav.classList.remove("active"));
        // Add active class to clicked item
        e.currentTarget.classList.add("active");

        // Simulate navigation with animation
        this.animateContentTransition();
      });
    });
  }

  setupInteractiveElements() {
    const buttons = document.querySelectorAll(".btn");
    buttons.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const btnText = e.currentTarget.textContent.trim();
        this.handleButtonClick(btnText);
      });
    });

    // Add click effects to cards
    const cards = document.querySelectorAll(".card, .feature-card");
    cards.forEach((card) => {
      card.addEventListener("click", () => {
        card.style.transform = "scale(0.98)";
        setTimeout(() => {
          card.style.transform = "";
        }, 150);
      });
    });
  }

  handleButtonClick(buttonText) {
    switch (buttonText) {
      case "API Documentation":
        this.showNotification("Opening API Documentation...", "info");
        break;
      case "View Metrics":
        this.showNotification("Loading detailed metrics...", "info");
        this.updateMetricsDisplay();
        break;
      case "System Settings":
        this.showNotification("Accessing system settings...", "info");
        break;
      case "Download Logs":
        this.showNotification("Preparing log files for download...", "info");
        break;
    }
  }

  startRealTimeUpdates() {
    setInterval(() => {
      if (this.isRunning) {
        this.updateMetrics();
        this.updateProgressBars();
        this.updateTimestamp();
      }
    }, 3000); // Update every 3 seconds

    // Update connections and requests more frequently
    setInterval(() => {
      if (this.isRunning) {
        this.updateLiveMetrics();
      }
    }, 1000); // Update every second
  }

  updateMetrics() {
    // Simulate realistic metric changes
    this.metricsData.responseTime = Math.max(
      20,
      this.metricsData.responseTime + (Math.random() - 0.5) * 10
    );
    this.metricsData.cpuUsage = Math.max(
      10,
      Math.min(80, this.metricsData.cpuUsage + (Math.random() - 0.5) * 5)
    );
    this.metricsData.ramUsage = Math.max(
      2,
      Math.min(14, this.metricsData.ramUsage + (Math.random() - 0.5) * 0.5)
    );
    this.metricsData.cacheHitRate = Math.max(
      85,
      Math.min(99, this.metricsData.cacheHitRate + (Math.random() - 0.5) * 2)
    );
    this.metricsData.bandwidth = Math.max(
      1,
      Math.min(10, this.metricsData.bandwidth + (Math.random() - 0.5) * 0.5)
    );

    // Update display
    this.updateMetricsDisplay();
  }

  updateLiveMetrics() {
    // Update active connections
    this.metricsData.activeConnections = Math.max(
      800,
      Math.min(
        2000,
        this.metricsData.activeConnections +
          Math.floor((Math.random() - 0.5) * 100)
      )
    );

    // Update requests per minute
    this.metricsData.requestsPerMin = Math.max(
      5000,
      Math.min(
        15000,
        this.metricsData.requestsPerMin +
          Math.floor((Math.random() - 0.5) * 1000)
      )
    );

    // Update display
    const connectionsElement = document.querySelector(
      '.metric-value[data-metric="connections"]'
    );
    const requestsElement = document.querySelector(
      '.metric-value[data-metric="requests"]'
    );

    if (connectionsElement) {
      connectionsElement.textContent =
        this.metricsData.activeConnections.toLocaleString();
    }
    if (requestsElement) {
      requestsElement.textContent =
        this.metricsData.requestsPerMin.toLocaleString();
    }
  }

  updateMetricsDisplay() {
    // Update response time
    const responseTimeElement = document.querySelector(
      '.metric-value[data-metric="response-time"]'
    );
    if (responseTimeElement) {
      responseTimeElement.textContent =
        Math.round(this.metricsData.responseTime) + "ms";
    }

    // Update CPU usage
    const cpuElement = document.querySelector(
      '.metric-value[data-metric="cpu"]'
    );
    if (cpuElement) {
      cpuElement.textContent = Math.round(this.metricsData.cpuUsage) + "%";
    }

    // Update RAM usage
    const ramElement = document.querySelector(
      '.metric-value[data-metric="ram"]'
    );
    if (ramElement) {
      ramElement.textContent = `${this.metricsData.ramUsage.toFixed(1)}GB / ${
        this.metricsData.ramTotal
      }GB`;
    }

    // Update cache hit rate
    const cacheElement = document.querySelector(
      '.metric-value[data-metric="cache"]'
    );
    if (cacheElement) {
      cacheElement.textContent = this.metricsData.cacheHitRate.toFixed(1) + "%";
    }

    // Update bandwidth
    const bandwidthElement = document.querySelector(
      '.metric-value[data-metric="bandwidth"]'
    );
    if (bandwidthElement) {
      bandwidthElement.textContent =
        this.metricsData.bandwidth.toFixed(1) + "MB/s";
    }
  }

  updateProgressBars() {
    const progressBars = document.querySelectorAll(".progress-fill");
    progressBars.forEach((bar, index) => {
      let percentage;
      switch (index) {
        case 0: // CPU usage
          percentage = this.metricsData.cpuUsage;
          break;
        case 1: // RAM usage
          percentage =
            (this.metricsData.ramUsage / this.metricsData.ramTotal) * 100;
          break;
        case 2: // Network usage (simulated)
          percentage = (this.metricsData.bandwidth / 10) * 100;
          break;
        default:
          percentage = Math.random() * 100;
      }
      bar.style.width = Math.min(100, Math.max(0, percentage)) + "%";
    });
  }

  updateTimestamp() {
    const timestampElement = document.querySelector(
      ".footer-right span:last-child"
    );
    if (timestampElement) {
      timestampElement.textContent = `Live since: ${new Date().toLocaleString()}`;
    }
  }

  animateProgressBars() {
    const progressBars = document.querySelectorAll(".progress-fill");
    progressBars.forEach((bar, index) => {
      setTimeout(() => {
        bar.style.transition = "width 1s ease-in-out";
      }, index * 200);
    });
  }

  animateContentTransition() {
    const mainContent = document.querySelector(".main");
    mainContent.style.opacity = "0.7";
    mainContent.style.transform = "translateY(10px)";

    setTimeout(() => {
      mainContent.style.opacity = "1";
      mainContent.style.transform = "translateY(0)";
    }, 200);
  }

  setupNotifications() {
    // Create notification container
    const notificationContainer = document.createElement("div");
    notificationContainer.className = "notification-container";
    notificationContainer.style.cssText = `
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    z-index: 1000;
                    display: flex;
                    flex-direction: column;
                    gap: 10px;
                `;
    document.body.appendChild(notificationContainer);
  }

  showNotification(message, type = "success") {
    const notification = document.createElement("div");
    notification.className = `notification notification-${type}`;

    const bgColor =
      type === "success"
        ? "var(--success)"
        : type === "warning"
        ? "var(--warning)"
        : "var(--primary-green)";

    notification.style.cssText = `
                    background: ${bgColor};
                    color: white;
                    padding: 1rem 1.5rem;
                    border-radius: 10px;
                    box-shadow: var(--shadow-medium);
                    transform: translateX(100%);
                    transition: transform 0.3s ease;
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    font-weight: 500;
                    min-width: 300px;
                `;

    notification.innerHTML = `
                    <span class="material-icons">${
                      type === "success"
                        ? "check_circle"
                        : type === "warning"
                        ? "warning"
                        : "info"
                    }</span>
                    ${message}
                `;

    const container = document.querySelector(".notification-container");
    container.appendChild(notification);

    // Animate in
    setTimeout(() => {
      notification.style.transform = "translateX(0)";
    }, 100);

    // Animate out and remove
    setTimeout(() => {
      notification.style.transform = "translateX(100%)";
      setTimeout(() => {
        container.removeChild(notification);
      }, 300);
    }, 3000);
  }

  // System status checker
  checkSystemHealth() {
    const checks = [
      { name: "API Endpoints", status: "healthy" },
      { name: "Database Connection", status: "healthy" },
      { name: "Redis Cache", status: "healthy" },
      { name: "External Services", status: "healthy" },
      { name: "SSL Certificate", status: "healthy" },
    ];

    return checks;
  }

  // Simulate system alerts
  simulateAlerts() {
    const alerts = [
      "High CPU usage detected on server-02",
      "SSL certificate expires in 30 days",
      "Database backup completed successfully",
      "New security patch available",
      "Performance optimization completed",
    ];

    setInterval(() => {
      if (Math.random() < 0.1) {
        // 10% chance every interval
        const randomAlert = alerts[Math.floor(Math.random() * alerts.length)];
        this.showNotification(randomAlert, "info");
      }
    }, 30000); // Check every 30 seconds
  }
}

// Utility functions
function formatBytes(bytes) {
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  if (bytes === 0) return "0 Bytes";
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return Math.round((bytes / Math.pow(1024, i)) * 100) / 100 + " " + sizes[i];
}

function formatUptime(seconds) {
  const days = Math.floor(seconds / 86400);
  const hours = Math.floor((seconds % 86400) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  return `${days}d ${hours}h ${minutes}m`;
}

// Keyboard shortcuts
document.addEventListener("keydown", (e) => {
  if (e.ctrlKey || e.metaKey) {
    switch (e.key) {
      case "1":
        e.preventDefault();
        document.querySelector(".nav-item").click();
        break;
      case "r":
        e.preventDefault();
        location.reload();
        break;
    }
  }
});

// Initialize dashboard when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  // Add data attributes to metric values for easier targeting
  const metricValues = document.querySelectorAll(".metric-value");
  metricValues.forEach((element, index) => {
    const metricText = element.parentElement
      .querySelector(".metric-label")
      .textContent.toLowerCase();
    if (metricText.includes("response")) {
      element.setAttribute("data-metric", "response-time");
    } else if (metricText.includes("cpu")) {
      element.setAttribute("data-metric", "cpu");
    } else if (metricText.includes("ram")) {
      element.setAttribute("data-metric", "ram");
    } else if (metricText.includes("cache")) {
      element.setAttribute("data-metric", "cache");
    } else if (metricText.includes("connections")) {
      element.setAttribute("data-metric", "connections");
    } else if (metricText.includes("requests")) {
      element.setAttribute("data-metric", "requests");
    } else if (metricText.includes("bandwidth")) {
      element.setAttribute("data-metric", "bandwidth");
    }
  });

  // Initialize dashboard manager
  const dashboard = new DashboardManager();

  // Start alert simulation
  dashboard.simulateAlerts();

  // Welcome notification
  setTimeout(() => {
    dashboard.showNotification("Dashboard loaded successfully!", "success");
  }, 1000);

  // Performance tip
  setTimeout(() => {
    dashboard.showNotification(
      "Tip: Use Ctrl+1 to navigate to overview",
      "info"
    );
  }, 5000);
});

// Handle visibility change (pause updates when tab is not active)
document.addEventListener("visibilitychange", () => {
  const dashboard = window.dashboardInstance;
  if (dashboard) {
    dashboard.isRunning = !document.hidden;
  }
});

// Service Worker registration (for PWA capabilities)
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js")
      .then((registration) => {
        console.log("SW registered: ", registration);
      })
      .catch((registrationError) => {
        console.log("SW registration failed: ", registrationError);
      });
  });
}
