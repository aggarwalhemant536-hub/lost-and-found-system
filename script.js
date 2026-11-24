/* 
  LPU Lost & Found System
  Made by: [Your Name], Reg No: [Your Reg No], Section: [Section]
  File: script.js (Main JavaScript file)
*/

// ==========================================================================
// 1. HELPER FUNCTIONS TO GET AND SAVE DATA IN LOCALSTORAGE
// ==========================================================================

// this function gets all items from localStorage
function getItems() {
  var data = localStorage.getItem("lpu_items");
  if (data) {
    return JSON.parse(data);
  }
  return [];
}

// this function saves the items list to localStorage
function saveItems(itemList) {
  localStorage.setItem("lpu_items", JSON.stringify(itemList));
}

// this function gets notifications list from localStorage
function getNotifications() {
  var data = localStorage.getItem("lpu_notifications");
  if (data) {
    return JSON.parse(data);
  }
  return [];
}

// this function saves notifications list to localStorage
function saveNotifications(notifList) {
  localStorage.setItem("lpu_notifications", JSON.stringify(notifList));
}

// this function adds a new notification to the list
function addNotification(title, message) {
  var notifList = getNotifications();
  var newNotif = {
    id: "notif-" + Date.now(),
    title: title,
    message: message,
    time: "Just now",
    read: false
  };
  // add new notification to the top of list
  notifList.unshift(newNotif);
  saveNotifications(notifList);
  renderNotifications();
}

// this function returns the currently logged in student, if any
function getCurrentUser() {
  var userData = localStorage.getItem("lpu_user");
  if (userData) {
    return JSON.parse(userData);
  }
  return null;
}

// ==========================================================================
// 2. TOAST NOTIFICATIONS (INSTEAD OF ALERT)
// ==========================================================================

// this function shows a nice toast popup at the bottom right
function showToast(message, type) {
  // type can be: 'success', 'danger', 'info'
  if (!type) {
    type = "info";
  }

  // check if toast container exists, if not create it
  var container = document.querySelector(".toast-container");
  if (!container) {
    container = document.createElement("div");
    container.className = "toast-container";
    document.body.appendChild(container);
  }

  // create toast element
  var toast = document.createElement("div");
  toast.className = "toast toast-" + type;

  var icon = "ℹ️";
  if (type === "success") {
    icon = "✅";
  } else if (type === "danger") {
    icon = "❌";
  }

  toast.innerHTML = "<span>" + icon + "</span> <span>" + message + "</span>";
  container.appendChild(toast);

  // automatically remove toast after 3.5 seconds
  setTimeout(function () {
    toast.style.opacity = "0";
    toast.style.transform = "translateX(50px)";
    toast.style.transition = "all 0.3s ease";
    setTimeout(function () {
      if (toast.parentNode) {
        toast.parentNode.removeChild(toast);
      }
    }, 300);
  }, 3500);
}

// ==========================================================================
// 3. NAVBAR & NOTIFICATIONS DROPDOWN SETUP
// ==========================================================================

// this function updates the navbar with logged in user details and active links
function setupNavbar() {
  var userPill = document.getElementById("navUserPill");
  var loginLink = document.getElementById("navLoginLink");
  var currentUser = getCurrentUser();

  if (userPill && loginLink) {
    if (currentUser) {
      userPill.style.display = "flex";
      userPill.innerHTML = "👤 " + currentUser.name + " <span class='user-reg'>(" + currentUser.regNo + ")</span> <a href='javascript:void(0)' onclick='logoutStudent()' style='margin-left:6px; color:#ff8533;' title='Logout'>✕</a>";
      loginLink.style.display = "none";
    } else {
      userPill.style.display = "none";
      loginLink.style.display = "inline-block";
    }
  }

  // setup notification bell click toggle
  var notifBtn = document.getElementById("notifBtn");
  var notifDropdown = document.getElementById("notifDropdown");

  if (notifBtn && notifDropdown) {
    notifBtn.onclick = function (e) {
      e.stopPropagation();
      notifDropdown.classList.toggle("show");
    };

    // click outside to close dropdown
    document.addEventListener("click", function (e) {
      if (!notifDropdown.contains(e.target) && e.target !== notifBtn) {
        notifDropdown.classList.remove("show");
      }
    });
  }

  // mobile hamburger menu toggle
  var hamburger = document.getElementById("hamburgerBtn");
  var navMenu = document.getElementById("navMenu");
  if (hamburger && navMenu) {
    hamburger.onclick = function () {
      navMenu.classList.toggle("show");
    };
  }

  // render notifications on load
  renderNotifications();
}

// this function renders the notifications inside the dropdown
function renderNotifications() {
  var notifBadge = document.getElementById("notifBadge");
  var notifListEl = document.getElementById("notifList");
  if (!notifListEl) return;

  var notifList = getNotifications();
  var unreadCount = 0;

  for (var i = 0; i < notifList.length; i++) {
    if (!notifList[i].read) {
      unreadCount++;
    }
  }

  if (notifBadge) {
    if (unreadCount > 0) {
      notifBadge.style.display = "flex";
      notifBadge.innerText = unreadCount;
    } else {
      notifBadge.style.display = "none";
    }
  }

  if (notifList.length === 0) {
    notifListEl.innerHTML = "<div class='notif-empty'>No notifications yet</div>";
    return;
  }

  var html = "";
  for (var j = 0; j < notifList.length; j++) {
    var n = notifList[j];
    var unreadClass = n.read ? "" : "unread";
    html += "<div class='notif-item " + unreadClass + "'>";
    html += "<div class='notif-item-title'>" + n.title + "</div>";
    html += "<div class='notif-item-msg'>" + n.message + "</div>";
    html += "<div class='notif-item-time'>🕒 " + n.time + "</div>";
    html += "</div>";
  }

  notifListEl.innerHTML = html;
}

// this function marks all notifications as read
function markAllNotificationsRead() {
  var notifList = getNotifications();
  for (var i = 0; i < notifList.length; i++) {
    notifList[i].read = true;
  }
  saveNotifications(notifList);
  renderNotifications();
  showToast("All notifications marked as read", "info");
}

// this function logs out student
function logoutStudent() {
  localStorage.removeItem("lpu_user");
  showToast("You have been logged out", "info");
  setTimeout(function () {
    window.location.reload();
  }, 600);
}

// ==========================================================================
// 4. DEFAULT CATEGORY PLACEHOLDER IMAGES
// ==========================================================================

// if student doesn't upload a picture, generate a clean SVG placeholder
function getCategoryPlaceholder(category) {
  var icon = "📦";
  var bgColor = "%23e9ecef";
  var label = "ITEM PHOTO";

  if (category === "ID card") {
    icon = "🪪";
    bgColor = "%23ffedd5";
    label = "STUDENT ID CARD";
  } else if (category === "Phone") {
    icon = "📱";
    bgColor = "%23e0e7ff";
    label = "PHONE / ACCESSORY";
  } else if (category === "Wallet") {
    icon = "👛";
    bgColor = "%23fef3c7";
    label = "WALLET / PURSE";
  } else if (category === "Laptop/Charger") {
    icon = "💻";
    bgColor = "%23dbeafe";
    label = "LAPTOP / CHARGER";
  } else if (category === "Books") {
    icon = "📚";
    bgColor = "%23dcfce7";
    label = "BOOKS / NOTES";
  } else if (category === "Keys") {
    icon = "🔑";
    bgColor = "%23fee2e2";
    label = "KEYS / KEYCHAIN";
  } else if (category === "Bottle") {
    icon = "🍶";
    bgColor = "%23cffafe";
    label = "WATER BOTTLE";
  }

  return "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='400' height='260' viewBox='0 0 400 260'><rect width='400' height='260' fill='" + bgColor + "'/><text x='200' y='125' dominant-baseline='middle' text-anchor='middle' font-size='60'>" + icon + "</text><text x='200' y='190' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='15' font-weight='bold' fill='%23475569'>" + label + "</text></svg>";
}

// ==========================================================================
// 5. HOMEPAGE LOGIC (INDEX.HTML)
// ==========================================================================

// this function animates the numbers on the homepage from 0 to real value
function animateCounters() {
  var items = getItems();
  var totalCount = items.length;
  var returnedCount = 0;
  var lostCount = 0;

  for (var i = 0; i < items.length; i++) {
    if (items[i].status === "Returned") {
      returnedCount++;
    }
    if (items[i].type === "Lost" && items[i].status !== "Returned") {
      lostCount++;
    }
  }

  animateSingleCounter("statTotal", totalCount);
  animateSingleCounter("statReturned", returnedCount);
  animateSingleCounter("statLost", lostCount);
}

// helper to animate a single counter number
function animateSingleCounter(elementId, targetValue) {
  var el = document.getElementById(elementId);
  if (!el) return;

  var current = 0;
  var step = Math.ceil(targetValue / 20) || 1;
  var timer = setInterval(function () {
    current += step;
    if (current >= targetValue) {
      current = targetValue;
      clearInterval(timer);
    }
    el.innerText = current;
  }, 40);
}

// this function shows all item cards on the index page
function showItems(itemList) {
  var container = document.getElementById("itemsContainer");
  var countEl = document.getElementById("itemCountText");
  if (!container) return;

  if (countEl) {
    countEl.innerText = "Showing " + itemList.length + " items";
  }

  // if no items match the search or filter
  if (itemList.length === 0) {
    container.innerHTML = "<div class='empty-state'>" +
      "<div class='empty-state-icon'>🔍</div>" +
      "<h3>No items found</h3>" +
      "<p>We couldn't find any items matching your filters or search keywords.</p>" +
      "<button class='btn btn-outline' onclick='resetFilters()'>Reset All Filters</button>" +
      "</div>";
    return;
  }

  var html = "";
  for (var i = 0; i < itemList.length; i++) {
    var item = itemList[i];

    // badge class for lost/found
    var typeBadgeClass = (item.type === "Lost") ? "badge-lost" : "badge-found";

    // status tag class
    var statusClass = "status-open";
    if (item.status === "Claim Pending") {
      statusClass = "status-claim-pending";
    } else if (item.status === "Verified") {
      statusClass = "status-verified";
    } else if (item.status === "Returned") {
      statusClass = "status-returned";
    }

    html += "<div class='item-card' onclick=\"goToItem('" + item.id + "')\">";
    html += "  <div class='item-card-image-box'>";
    html += "    <img src='" + (item.image || getCategoryPlaceholder(item.category)) + "' alt='" + item.title + "' onerror=\"this.src='" + getCategoryPlaceholder(item.category) + "'\">";
    html += "    <span class='badge-type " + typeBadgeClass + "'>" + item.type + "</span>";
    html += "    <span class='badge-status " + statusClass + "'>" + item.status + "</span>";
    html += "  </div>";
    html += "  <div class='item-card-body'>";
    html += "    <div class='item-card-category'>🏷️ " + item.category + "</div>";
    html += "    <h3 class='item-card-title'>" + item.title + "</h3>";
    html += "    <p class='item-card-desc'>" + item.description + "</p>";
    html += "    <div class='item-card-meta'>";
    html += "      <span class='meta-item'>📍 " + item.location + "</span>";
    html += "      <span class='meta-item'>📅 " + item.date + "</span>";
    html += "    </div>";
    html += "  </div>";
    html += "</div>";
  }

  container.innerHTML = html;
}

// helper to open item details page
function goToItem(itemId) {
  window.location.href = "item.html?id=" + itemId;
}

// this function filters and sorts items according to inputs on index page
function filterItems() {
  var allItems = getItems();
  var filtered = [];

  var searchInput = document.getElementById("searchInput");
  var typeFilter = document.getElementById("typeFilter");
  var categoryFilter = document.getElementById("categoryFilter");
  var locationFilter = document.getElementById("locationFilter");
  var statusFilter = document.getElementById("statusFilter");
  var sortFilter = document.getElementById("sortFilter");

  var searchTerm = searchInput ? searchInput.value.toLowerCase().trim() : "";
  var selectedType = typeFilter ? typeFilter.value : "All";
  var selectedCategory = categoryFilter ? categoryFilter.value : "All";
  var selectedLocation = locationFilter ? locationFilter.value : "All";
  var selectedStatus = statusFilter ? statusFilter.value : "All";
  var selectedSort = sortFilter ? sortFilter.value : "newest";

  for (var i = 0; i < allItems.length; i++) {
    var item = allItems[i];

    // check search keyword in title, description, or location
    var matchesSearch = true;
    if (searchTerm !== "") {
      var fullText = (item.title + " " + item.description + " " + item.location + " " + item.category).toLowerCase();
      if (fullText.indexOf(searchTerm) === -1) {
        matchesSearch = false;
      }
    }

    // check type filter (Lost vs Found)
    var matchesType = (selectedType === "All" || item.type === selectedType);

    // check category filter
    var matchesCategory = (selectedCategory === "All" || item.category === selectedCategory);

    // check location filter
    var matchesLocation = (selectedLocation === "All" || item.location === selectedLocation);

    // check status filter
    var matchesStatus = (selectedStatus === "All" || item.status === selectedStatus);

    if (matchesSearch && matchesType && matchesCategory && matchesLocation && matchesStatus) {
      filtered.push(item);
    }
  }

  // sort items
  if (selectedSort === "newest") {
    filtered.sort(function (a, b) {
      return new Date(b.date) - new Date(a.date);
    });
  } else if (selectedSort === "oldest") {
    filtered.sort(function (a, b) {
      return new Date(a.date) - new Date(b.date);
    });
  }

  showItems(filtered);
}

// this function resets all filter inputs on index page
function resetFilters() {
  if (document.getElementById("searchInput")) document.getElementById("searchInput").value = "";
  if (document.getElementById("typeFilter")) document.getElementById("typeFilter").value = "All";
  if (document.getElementById("categoryFilter")) document.getElementById("categoryFilter").value = "All";
  if (document.getElementById("locationFilter")) document.getElementById("locationFilter").value = "All";
  if (document.getElementById("statusFilter")) document.getElementById("statusFilter").value = "All";
  if (document.getElementById("sortFilter")) document.getElementById("sortFilter").value = "newest";

  filterItems();
  showToast("Filters reset to default", "info");
}

// ==========================================================================
// 6. POST ITEM PAGE (POST.HTML)
// ==========================================================================

// global variable to keep track of uploaded photo base64
var uploadedPhotoBase64 = "";
var currentPostType = "Lost"; // default type

// this function switches between Lost and Found in the form
function setPostType(type) {
  currentPostType = type;
  var lostBtn = document.getElementById("typeLostBtn");
  var foundBtn = document.getElementById("typeFoundBtn");

  if (type === "Lost") {
    lostBtn.classList.add("active", "lost");
    foundBtn.classList.remove("active", "found");
    document.getElementById("postFormHeading").innerText = "Report a Lost Item";
  } else {
    foundBtn.classList.add("active", "found");
    lostBtn.classList.remove("active", "lost");
    document.getElementById("postFormHeading").innerText = "Report a Found Item";
  }
}

// this function handles photo file upload and converts it to base64
function handlePhotoUpload(input) {
  var file = input.files[0];
  if (!file) return;

  // limit file size to ~3MB for localStorage safety
  if (file.size > 3 * 1024 * 1024) {
    showToast("Please choose an image under 3MB", "danger");
    return;
  }

  var reader = new FileReader();
  reader.onload = function (e) {
    uploadedPhotoBase64 = e.target.result;
    var preview = document.getElementById("photoPreview");
    if (preview) {
      preview.src = uploadedPhotoBase64;
      preview.style.display = "block";
    }
    showToast("Photo uploaded successfully!", "success");
  };
  reader.readAsDataURL(file);
}

// this function pre-fills contact details if student is logged in
function setupPostForm() {
  var user = getCurrentUser();
  if (user) {
    var nameField = document.getElementById("postName");
    var regField = document.getElementById("postReg");
    var contactField = document.getElementById("postContact");

    if (nameField && !nameField.value) nameField.value = user.name;
    if (regField && !regField.value) regField.value = user.regNo;
    if (contactField && !contactField.value && user.phone) contactField.value = user.phone;
  }

  // set today's date as default in date picker
  var dateField = document.getElementById("postDate");
  if (dateField) {
    var today = new Date().toISOString().split("T")[0];
    dateField.value = today;
  }
}

// this function validates and adds a new item
function addItem(event) {
  event.preventDefault();

  var title = document.getElementById("postTitle").value.trim();
  var category = document.getElementById("postCategory").value;
  var location = document.getElementById("postLocation").value;
  var date = document.getElementById("postDate").value;
  var description = document.getElementById("postDesc").value.trim();
  var contactName = document.getElementById("postName").value.trim();
  var regNo = document.getElementById("postReg").value.trim();
  var contactInfo = document.getElementById("postContact").value.trim();

  // clear old error messages
  var errors = document.querySelectorAll(".error-message");
  for (var i = 0; i < errors.length; i++) {
    errors[i].style.display = "none";
  }

  var hasError = false;

  if (title === "") {
    showInputError("titleError", "Please enter item title");
    hasError = true;
  }
  if (category === "") {
    showInputError("categoryError", "Please select a category");
    hasError = true;
  }
  if (location === "") {
    showInputError("locationError", "Please select campus location");
    hasError = true;
  }
  if (date === "") {
    showInputError("dateError", "Please select the date");
    hasError = true;
  }
  if (description === "") {
    showInputError("descError", "Please describe the item");
    hasError = true;
  }
  if (contactName === "") {
    showInputError("nameError", "Please enter your name");
    hasError = true;
  }
  if (contactInfo === "") {
    showInputError("contactError", "Please enter contact info");
    hasError = true;
  }

  if (hasError) {
    showToast("Please fill in all required fields", "danger");
    return;
  }

  // create new item object
  var newItem = {
    id: "item-" + Date.now(),
    title: title,
    type: currentPostType,
    category: category,
    location: location,
    date: date,
    description: description,
    contactName: contactName,
    regNo: regNo || "N/A",
    contactInfo: contactInfo,
    status: "Open",
    approved: true, // auto approved for quick demo
    image: uploadedPhotoBase64 || getCategoryPlaceholder(category),
    claims: []
  };

  var itemList = getItems();
  itemList.unshift(newItem); // add to top
  saveItems(itemList);

  // add notification
  addNotification("New " + currentPostType + " Item", title + " was reported at " + location + ".");

  showToast("Item posted successfully!", "success");

  // redirect to homepage after brief pause
  setTimeout(function () {
    window.location.href = "index.html";
  }, 1000);
}

// helper to show error message under input
function showInputError(elementId, msg) {
  var el = document.getElementById(elementId);
  if (el) {
    el.innerText = msg;
    el.style.display = "block";
  }
}

// ==========================================================================
// 7. ITEM DETAILS & CLAIM LOGIC (ITEM.HTML)
// ==========================================================================

var currentLoadedItem = null;

// this function loads single item details using query string ?id=...
function loadItemDetails() {
  var params = new URLSearchParams(window.location.search);
  var itemId = params.get("id");

  if (!itemId) {
    showToast("No item ID provided in URL", "danger");
    return;
  }

  var items = getItems();
  for (var i = 0; i < items.length; i++) {
    if (items[i].id === itemId) {
      currentLoadedItem = items[i];
      break;
    }
  }

  if (!currentLoadedItem) {
    var contentBox = document.getElementById("itemDetailsContainer");
    if (contentBox) {
      contentBox.innerHTML = "<div class='empty-state'><h3>Item not found</h3><p>The requested item does not exist or was deleted.</p><a href='index.html' class='btn btn-primary'>Back to Home</a></div>";
    }
    return;
  }

  // populate elements
  document.getElementById("detailTitle").innerText = currentLoadedItem.title;
  document.getElementById("detailCategory").innerText = currentLoadedItem.category;
  document.getElementById("detailLocation").innerText = currentLoadedItem.location;
  document.getElementById("detailDate").innerText = currentLoadedItem.date;
  document.getElementById("detailContactName").innerText = currentLoadedItem.contactName;
  document.getElementById("detailContactInfo").innerText = currentLoadedItem.contactInfo;
  document.getElementById("detailRegNo").innerText = currentLoadedItem.regNo || "N/A";
  document.getElementById("detailDesc").innerText = currentLoadedItem.description;

  // image
  var imgEl = document.getElementById("detailImage");
  if (imgEl) {
    imgEl.src = currentLoadedItem.image || getCategoryPlaceholder(currentLoadedItem.category);
  }

  // badges
  var typeBadge = document.getElementById("detailTypeBadge");
  if (typeBadge) {
    typeBadge.innerText = currentLoadedItem.type;
    typeBadge.className = "badge-type " + (currentLoadedItem.type === "Lost" ? "badge-lost" : "badge-found");
  }

  var statusBadge = document.getElementById("detailStatusBadge");
  if (statusBadge) {
    statusBadge.innerText = currentLoadedItem.status;
    var sClass = "status-open";
    if (currentLoadedItem.status === "Claim Pending") sClass = "status-claim-pending";
    if (currentLoadedItem.status === "Verified") sClass = "status-verified";
    if (currentLoadedItem.status === "Returned") sClass = "status-returned";
    statusBadge.className = "badge-status " + sClass;
  }

  // claim button text & visibility
  var claimBtn = document.getElementById("claimActionBtn");
  if (claimBtn) {
    if (currentLoadedItem.status === "Returned") {
      claimBtn.innerText = "✅ Item Already Returned to Owner";
      claimBtn.className = "btn btn-secondary";
      claimBtn.disabled = true;
    } else {
      if (currentLoadedItem.type === "Found") {
        claimBtn.innerText = "✋ This is Mine (Claim Item)";
      } else {
        claimBtn.innerText = "🙋‍♂️ I Found This Item / Report Match";
      }
      claimBtn.disabled = false;
      claimBtn.onclick = openClaimModal;
    }
  }

  // update status timeline
  updateStatusTimeline(currentLoadedItem.status);
}

// this function updates the 4-step progress tracker on item page
function updateStatusTimeline(status) {
  var step1 = document.getElementById("timelineStep1"); // Open
  var step2 = document.getElementById("timelineStep2"); // Claim Pending
  var step3 = document.getElementById("timelineStep3"); // Verified
  var step4 = document.getElementById("timelineStep4"); // Returned

  if (!step1 || !step2 || !step3 || !step4) return;

  // reset all
  step1.className = "timeline-step";
  step2.className = "timeline-step";
  step3.className = "timeline-step";
  step4.className = "timeline-step";

  if (status === "Open") {
    step1.className = "timeline-step active";
  } else if (status === "Claim Pending") {
    step1.className = "timeline-step completed";
    step2.className = "timeline-step active";
  } else if (status === "Verified") {
    step1.className = "timeline-step completed";
    step2.className = "timeline-step completed";
    step3.className = "timeline-step active";
  } else if (status === "Returned") {
    step1.className = "timeline-step completed";
    step2.className = "timeline-step completed";
    step3.className = "timeline-step completed";
    step4.className = "timeline-step completed";
  }
}

// modal control
function openClaimModal() {
  var modal = document.getElementById("claimModal");
  if (!modal) return;

  // prefill student details if logged in
  var user = getCurrentUser();
  if (user) {
    var nameInput = document.getElementById("claimantName");
    var regInput = document.getElementById("claimantReg");
    var phoneInput = document.getElementById("claimantPhone");
    if (nameInput) nameInput.value = user.name;
    if (regInput) regInput.value = user.regNo;
    if (phoneInput && user.phone) phoneInput.value = user.phone;
  }

  modal.classList.add("show");
}

function closeClaimModal() {
  var modal = document.getElementById("claimModal");
  if (modal) modal.classList.remove("show");
}

// this function handles claim submission
function submitClaim(event) {
  event.preventDefault();

  if (!currentLoadedItem) return;

  var name = document.getElementById("claimantName").value.trim();
  var reg = document.getElementById("claimantReg").value.trim();
  var phone = document.getElementById("claimantPhone").value.trim();
  var proof = document.getElementById("claimantProof").value.trim();

  if (!name || !reg || !phone || !proof) {
    showToast("Please fill in all verification details", "danger");
    return;
  }

  var newClaim = {
    claimantName: name,
    claimantReg: reg,
    claimantPhone: phone,
    proofText: proof,
    claimDate: new Date().toISOString().split("T")[0],
    status: "Pending"
  };

  // initialize claims array if undefined
  if (!currentLoadedItem.claims) {
    currentLoadedItem.claims = [];
  }
  currentLoadedItem.claims.push(newClaim);

  // if currently Open, change status to Claim Pending
  if (currentLoadedItem.status === "Open") {
    currentLoadedItem.status = "Claim Pending";
  }

  // save updated item list in localStorage
  var allItems = getItems();
  for (var i = 0; i < allItems.length; i++) {
    if (allItems[i].id === currentLoadedItem.id) {
      allItems[i] = currentLoadedItem;
      break;
    }
  }
  saveItems(allItems);

  // add notification
  addNotification(
    "New Claim Submitted",
    name + " submitted a claim for " + currentLoadedItem.title + "."
  );

  closeClaimModal();
  showToast("Claim request submitted! Owner/Admin will review your proof.", "success");

  // reload page details to show updated status
  setTimeout(function () {
    loadItemDetails();
  }, 500);
}

// ==========================================================================
// 8. ADMIN PANEL LOGIC (ADMIN.HTML)
// ==========================================================================

// check if admin is currently authenticated in session
function isAdminLoggedIn() {
  return sessionStorage.getItem("lpu_admin_logged") === "true";
}

// admin login handler
function loginAdmin(event) {
  if (event) event.preventDefault();
  var user = document.getElementById("adminUser").value.trim();
  var pass = document.getElementById("adminPass").value.trim();

  // simple hardcoded college project credentials
  if (user === "admin" && pass === "admin123") {
    sessionStorage.setItem("lpu_admin_logged", "true");
    showToast("Admin access granted!", "success");
    checkAdminAuth();
  } else {
    showToast("Invalid admin credentials! Use admin / admin123", "danger");
  }
}

// admin logout handler
function logoutAdmin() {
  sessionStorage.removeItem("lpu_admin_logged");
  showToast("Admin logged out", "info");
  checkAdminAuth();
}

// check auth state and display appropriate view
function checkAdminAuth() {
  var loginBox = document.getElementById("adminLoginBox");
  var dashboard = document.getElementById("adminDashboard");

  if (!loginBox || !dashboard) return;

  if (isAdminLoggedIn()) {
    loginBox.style.display = "none";
    dashboard.style.display = "block";
    loadAdminStats();
    loadAdminItemsTable();
    loadAdminClaims();
  } else {
    loginBox.style.display = "block";
    dashboard.style.display = "none";
  }
}

// switch between Admin Tabs (Items Table vs Claims Review)
function switchAdminTab(tabName) {
  var tabItems = document.getElementById("adminTabItems");
  var tabClaims = document.getElementById("adminTabClaims");
  var viewItems = document.getElementById("adminItemsView");
  var viewClaims = document.getElementById("adminClaimsView");

  if (tabName === "items") {
    tabItems.classList.add("active");
    tabClaims.classList.remove("active");
    viewItems.style.display = "block";
    viewClaims.style.display = "none";
  } else {
    tabClaims.classList.add("active");
    tabItems.classList.remove("active");
    viewItems.style.display = "none";
    viewClaims.style.display = "block";
  }
}

// load admin stats counters
function loadAdminStats() {
  var items = getItems();
  var total = items.length;
  var pendingClaimsCount = 0;
  var returnedCount = 0;

  for (var i = 0; i < items.length; i++) {
    if (items[i].status === "Returned") {
      returnedCount++;
    }
    if (items[i].claims && items[i].claims.length > 0) {
      for (var c = 0; c < items[i].claims.length; c++) {
        if (items[i].claims[c].status === "Pending") {
          pendingClaimsCount++;
        }
      }
    }
  }

  if (document.getElementById("adminStatTotal")) {
    document.getElementById("adminStatTotal").innerText = total;
  }
  if (document.getElementById("adminStatClaims")) {
    document.getElementById("adminStatClaims").innerText = pendingClaimsCount;
  }
  if (document.getElementById("adminStatReturned")) {
    document.getElementById("adminStatReturned").innerText = returnedCount;
  }
}

// render all items in the moderation table
function loadAdminItemsTable() {
  var tableBody = document.getElementById("adminTableBody");
  if (!tableBody) return;

  var items = getItems();

  if (items.length === 0) {
    tableBody.innerHTML = "<tr><td colspan='7' style='text-align:center;'>No items available</td></tr>";
    return;
  }

  var html = "";
  for (var i = 0; i < items.length; i++) {
    var it = items[i];
    var typeColor = it.type === "Lost" ? "#dc3545" : "#198754";

    html += "<tr>";
    html += "  <td><strong>" + it.title + "</strong></td>";
    html += "  <td><span style='color:" + typeColor + "; font-weight:700;'>" + it.type + "</span></td>";
    html += "  <td>" + it.category + "</td>";
    html += "  <td>" + it.location + "</td>";
    html += "  <td><span class='badge-status'>" + it.status + "</span></td>";
    html += "  <td>" + it.contactName + " (" + (it.regNo || "N/A") + ")</td>";
    html += "  <td>";
    html += "    <div class='table-actions'>";
    html += "      <a href='item.html?id=" + it.id + "' class='btn btn-sm btn-outline-dark' target='_blank'>View</a>";
    if (it.status !== "Returned") {
      html += "      <button class='btn btn-sm btn-success' onclick=\"adminMarkReturned('" + it.id + "')\">Return</button>";
    }
    html += "      <button class='btn btn-sm btn-danger' onclick=\"adminDeleteItem('" + it.id + "')\">Delete</button>";
    html += "    </div>";
    html += "  </td>";
    html += "</tr>";
  }

  tableBody.innerHTML = html;
}

// render pending claims for admin review
function loadAdminClaims() {
  var container = document.getElementById("adminClaimsContainer");
  if (!container) return;

  var items = getItems();
  var foundAnyClaims = false;
  var html = "";

  for (var i = 0; i < items.length; i++) {
    var it = items[i];
    if (it.claims && it.claims.length > 0) {
      for (var c = 0; c < it.claims.length; c++) {
        foundAnyClaims = true;
        var claim = it.claims[c];
        var claimStatusColor = claim.status === "Approved" ? "#198754" : (claim.status === "Rejected" ? "#dc3545" : "#ff8533");

        html += "<div class='claim-item-card'>";
        html += "  <div class='claim-item-header'>";
        html += "    <div><strong>Item: " + it.title + "</strong> (" + it.type + " at " + it.location + ")</div>";
        html += "    <div>Status: <span style='color:" + claimStatusColor + "; font-weight:700;'>" + claim.status + "</span></div>";
        html += "  </div>";
        html += "  <div><strong>Claimant:</strong> " + claim.claimantName + " (Reg No: " + claim.claimantReg + ") | 📞 " + claim.claimantPhone + "</div>";
        html += "  <div class='claim-proof-box'>";
        html += "    <strong>Verification Answer / Proof:</strong><br>";
        html += "    \"" + claim.proofText + "\"";
        html += "  </div>";
        html += "  <div style='display:flex; justify-content:space-between; align-items:center;'>";
        html += "    <span style='font-size:12px; color:#6c757d;'>Submitted on: " + (claim.claimDate || "Recently") + "</span>";
        html += "    <div class='table-actions'>";
        if (claim.status === "Pending") {
          html += "      <button class='btn btn-sm btn-success' onclick=\"adminApproveClaim('" + it.id + "', " + c + ")\">Approve Claim</button>";
          html += "      <button class='btn btn-sm btn-danger' onclick=\"adminRejectClaim('" + it.id + "', " + c + ")\">Reject Claim</button>";
        } else {
          html += "      <span style='font-size:12px; color:#6c757d;'>Decision recorded</span>";
        }
        html += "    </div>";
        html += "  </div>";
        html += "</div>";
      }
    }
  }

  if (!foundAnyClaims) {
    container.innerHTML = "<div class='empty-state'><p>No claim requests received yet.</p></div>";
  } else {
    container.innerHTML = html;
  }
}

// admin marks an item as returned
function adminMarkReturned(itemId) {
  var items = getItems();
  for (var i = 0; i < items.length; i++) {
    if (items[i].id === itemId) {
      items[i].status = "Returned";
      saveItems(items);
      addNotification("Item Returned", items[i].title + " was marked as Returned to owner.");
      showToast("Item marked as Returned!", "success");
      loadAdminStats();
      loadAdminItemsTable();
      return;
    }
  }
}

// admin deletes an item
function adminDeleteItem(itemId) {
  if (!confirm("Are you sure you want to delete this item?")) return;

  var items = getItems();
  var newItems = [];
  for (var i = 0; i < items.length; i++) {
    if (items[i].id !== itemId) {
      newItems.push(items[i]);
    }
  }
  saveItems(newItems);
  showToast("Item deleted successfully", "info");
  loadAdminStats();
  loadAdminItemsTable();
  loadAdminClaims();
}

// admin approves a claim
function adminApproveClaim(itemId, claimIndex) {
  var items = getItems();
  for (var i = 0; i < items.length; i++) {
    if (items[i].id === itemId) {
      items[i].claims[claimIndex].status = "Approved";
      items[i].status = "Verified";
      saveItems(items);
      addNotification("Claim Approved", "Claim by " + items[i].claims[claimIndex].claimantName + " for " + items[i].title + " was approved!");
      showToast("Claim approved! Item marked as Verified.", "success");
      loadAdminStats();
      loadAdminItemsTable();
      loadAdminClaims();
      return;
    }
  }
}

// admin rejects a claim
function adminRejectClaim(itemId, claimIndex) {
  var items = getItems();
  for (var i = 0; i < items.length; i++) {
    if (items[i].id === itemId) {
      items[i].claims[claimIndex].status = "Rejected";
      items[i].status = "Open";
      saveItems(items);
      addNotification("Claim Rejected", "Claim by " + items[i].claims[claimIndex].claimantName + " was rejected.");
      showToast("Claim rejected. Item restored to Open.", "info");
      loadAdminStats();
      loadAdminItemsTable();
      loadAdminClaims();
      return;
    }
  }
}

// admin resets data to initial sample data
function resetToSampleData() {
  if (!confirm("Reset all items and notifications to original sample data?")) return;
  localStorage.setItem("lpu_items", JSON.stringify(initialItems));
  localStorage.setItem("lpu_notifications", JSON.stringify(initialNotifications));
  showToast("Data reset to initial sample items!", "success");
  setTimeout(function () {
    window.location.reload();
  }, 600);
}

// ==========================================================================
// 9. STUDENT LOGIN PAGE LOGIC (LOGIN.HTML)
// ==========================================================================

// student login function
function loginStudent(event) {
  event.preventDefault();

  var name = document.getElementById("studentName").value.trim();
  var regNo = document.getElementById("studentReg").value.trim();
  var section = document.getElementById("studentSection").value.trim();
  var phone = document.getElementById("studentPhone").value.trim();

  if (!name || !regNo) {
    showToast("Please enter your name and registration number", "danger");
    return;
  }

  var studentUser = {
    name: name,
    regNo: regNo,
    section: section || "K22XX",
    phone: phone || ""
  };

  localStorage.setItem("lpu_user", JSON.stringify(studentUser));
  showToast("Welcome, " + name + "! Logged in successfully.", "success");

  setTimeout(function () {
    window.location.href = "index.html";
  }, 800);
}

// quick fill helper for demo on login page
function fillSampleStudent() {
  if (document.getElementById("studentName")) document.getElementById("studentName").value = "Aman Sharma";
  if (document.getElementById("studentReg")) document.getElementById("studentReg").value = "12214582";
  if (document.getElementById("studentSection")) document.getElementById("studentSection").value = "K22SE";
  if (document.getElementById("studentPhone")) document.getElementById("studentPhone").value = "9876543210";
}

// ==========================================================================
// 10. INITIALIZATION ON DOM CONTENT LOADED
// ==========================================================================
document.addEventListener("DOMContentLoaded", function () {
  setupNavbar();
});
