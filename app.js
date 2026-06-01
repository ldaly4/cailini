const activities = [
  { name: "Running", icon: "run" },
  { name: "Padel", icon: "racket" },
  { name: "Pilates", icon: "pilates" },
  { name: "Strength", icon: "strength" },
  { name: "Swimming", icon: "swim" },
  { name: "Cycling", icon: "cycle" },
  { name: "Tennis", icon: "tennis" },
  { name: "Walking", icon: "walk" },
  { name: "Golf", icon: "golf" },
  { name: "Social meetups", icon: "social" }
];

const users = [
  { id: "u1", firstName: "Aisling", level: "beginner", area: "Dublin", bio: "New to golf, likes relaxed nine-hole rounds." },
  { id: "u2", firstName: "Niamh", level: "improver", area: "Dublin 14", bio: "Happy to play steady social golf." },
  { id: "u3", firstName: "Ciara", level: "confident", area: "Clontarf", bio: "Midweek golfer, keeps a friendly pace." },
  { id: "u4", firstName: "Ruth", level: "beginner", area: "Sandyford", bio: "Prefers no-pressure groups." },
  { id: "u5", firstName: "Maeve", level: "improver", area: "Malahide", bio: "Learning course strategy and short game." },
  { id: "u6", firstName: "Orla", level: "confident", area: "Rathfarnham", bio: "Likes early starts." },
  { id: "u7", firstName: "Saoirse", level: "beginner", area: "Dublin 6", bio: "Looking for friendly beginner groups." },
  { id: "u8", firstName: "Eimear", level: "improver", area: "Lucan", bio: "Social golf, coffee after." }
];

const currentUserId = "u1";

const golfClubs = [
  { id: "c1", name: "Elm Park Golf Club", area: "Dublin 4", bookingSystem: "BRS", externalBookingUrl: "https://www.elmparkgolfclub.ie/" },
  { id: "c2", name: "Grange Golf Club", area: "Rathfarnham", bookingSystem: "BRS", externalBookingUrl: "https://www.grangegolfclub.ie/" },
  { id: "c3", name: "Clontarf Golf Club", area: "Clontarf", bookingSystem: "ClubV1", externalBookingUrl: "https://www.clontarfgolfclub.ie/" },
  { id: "c4", name: "Malahide Golf Club", area: "Malahide", bookingSystem: "BRS", externalBookingUrl: "https://www.malahidegolfclub.ie/" },
  { id: "c5", name: "Stackstown Golf Club", area: "Dublin Mountains", bookingSystem: "other", externalBookingUrl: "https://www.stackstowngolfclub.ie/" },
  { id: "c6", name: "Castle Golf Club", area: "Rathfarnham", bookingSystem: "ClubV1", externalBookingUrl: "https://www.castlegc.ie/" }
];

let teeTimes = [
  { id: "t1", hostId: "u2", clubId: "c1", date: "2026-06-08", time: "10:20", holes: 18, maxPlayers: 4, level: "beginner", womenOnly: true, notes: "Relaxed, social, no pressure. Seed data.", status: "open", createdAt: "2026-06-01T09:00:00Z", seed: true },
  { id: "t2", hostId: "u3", clubId: "c3", date: "2026-06-09", time: "17:40", holes: 9, maxPlayers: 4, level: "all-levels", womenOnly: true, notes: "Nine after work, friendly pace. Seed data.", status: "open", createdAt: "2026-06-01T09:02:00Z", seed: true },
  { id: "t3", hostId: "u6", clubId: "c2", date: "2026-06-11", time: "08:10", holes: 18, maxPlayers: 4, level: "improver", womenOnly: true, notes: "Early round, coffee after. Seed data.", status: "open", createdAt: "2026-06-01T09:04:00Z", seed: true },
  { id: "t4", hostId: "u5", clubId: "c4", date: "2026-06-12", time: "13:30", holes: 18, maxPlayers: 4, level: "beginner", womenOnly: true, notes: "Beginner-friendly, casual scoring. Seed data.", status: "open", createdAt: "2026-06-01T09:06:00Z", seed: true },
  { id: "t5", hostId: "u8", clubId: "c5", date: "2026-06-13", time: "11:00", holes: 9, maxPlayers: 3, level: "all-levels", womenOnly: true, notes: "Short social loop. Seed data.", status: "open", createdAt: "2026-06-01T09:08:00Z", seed: true },
  { id: "t6", hostId: "u1", clubId: "c6", date: "2026-06-14", time: "09:50", holes: 18, maxPlayers: 4, level: "beginner", womenOnly: true, notes: "First hosted round, gentle pace. Seed data.", status: "open", createdAt: "2026-06-01T09:10:00Z", seed: true },
  { id: "t7", hostId: "u3", clubId: "c2", date: "2026-06-15", time: "16:20", holes: 9, maxPlayers: 4, level: "confident", womenOnly: true, notes: "Steady players, quick nine. Seed data.", status: "open", createdAt: "2026-06-01T09:12:00Z", seed: true },
  { id: "t8", hostId: "u2", clubId: "c4", date: "2026-06-16", time: "12:10", holes: 18, maxPlayers: 4, level: "improver", womenOnly: true, notes: "Social round with room for two. Seed data.", status: "open", createdAt: "2026-06-01T09:14:00Z", seed: true }
];

let teeTimeSlots = [
  { teeTimeId: "t1", userId: "u2", role: "host", joinStatus: "approved", joinedAt: "2026-06-01T09:00:00Z" },
  { teeTimeId: "t1", userId: "u4", role: "joiner", joinStatus: "approved", joinedAt: "2026-06-01T10:00:00Z" },
  { teeTimeId: "t2", userId: "u3", role: "host", joinStatus: "approved", joinedAt: "2026-06-01T09:02:00Z" },
  { teeTimeId: "t2", userId: "u7", role: "joiner", joinStatus: "approved", joinedAt: "2026-06-01T11:00:00Z" },
  { teeTimeId: "t3", userId: "u6", role: "host", joinStatus: "approved", joinedAt: "2026-06-01T09:04:00Z" },
  { teeTimeId: "t4", userId: "u5", role: "host", joinStatus: "approved", joinedAt: "2026-06-01T09:06:00Z" },
  { teeTimeId: "t4", userId: "u7", role: "joiner", joinStatus: "requested", joinedAt: "2026-06-01T12:00:00Z" },
  { teeTimeId: "t5", userId: "u8", role: "host", joinStatus: "approved", joinedAt: "2026-06-01T09:08:00Z" },
  { teeTimeId: "t6", userId: "u1", role: "host", joinStatus: "approved", joinedAt: "2026-06-01T09:10:00Z" },
  { teeTimeId: "t6", userId: "u4", role: "joiner", joinStatus: "requested", joinedAt: "2026-06-01T12:30:00Z" },
  { teeTimeId: "t6", userId: "u7", role: "joiner", joinStatus: "approved", joinedAt: "2026-06-01T12:40:00Z" },
  { teeTimeId: "t7", userId: "u3", role: "host", joinStatus: "approved", joinedAt: "2026-06-01T09:12:00Z" },
  { teeTimeId: "t8", userId: "u2", role: "host", joinStatus: "approved", joinedAt: "2026-06-01T09:14:00Z" },
  { teeTimeId: "t8", userId: "u5", role: "joiner", joinStatus: "approved", joinedAt: "2026-06-01T13:30:00Z" }
];

let notices = [];

const state = {
  filters: {
    club: "all",
    area: "all",
    date: "",
    level: "all",
    holes: "all",
    spotsOnly: false
  }
};

const byId = (id) => document.getElementById(id);

function iconSvg(type) {
  const icons = {
    run: '<path d="M13 4a2 2 0 1 0 0 4 2 2 0 0 0 0-4Z"/><path d="m8 23 3-7-3-3-2 3H3l3-6 4-2 4 4 3 1h4v3h-5l-3-1 2 4 4 4h-4l-4-4-2 4H8Z"/>',
    racket: '<path d="M15.5 4.5c3 3 3.4 7.5.9 10s-7 2.1-10-.9-3.4-7.5-.9-10 7-2.1 10 .9Z"/><path d="m14.5 14.5 6 6"/><path d="m19 22 3-3"/>',
    pilates: '<path d="M4 17c5-4 11-4 16 0"/><path d="M6 21h12"/><path d="M12 5v8"/><path d="M8 9h8"/>',
    strength: '<path d="M2 10h4v4H2z"/><path d="M18 10h4v4h-4z"/><path d="M6 8h3v8H6z"/><path d="M15 8h3v8h-3z"/><path d="M9 12h6"/>',
    swim: '<path d="M3 17c2 0 2-1 4-1s2 1 4 1 2-1 4-1 2 1 4 1 2-1 4-1"/><path d="M3 21c2 0 2-1 4-1s2 1 4 1 2-1 4-1 2 1 4 1 2-1 4-1"/><path d="m8 13 4-7 5 3"/>',
    cycle: '<circle cx="6" cy="17" r="4"/><circle cx="18" cy="17" r="4"/><path d="m6 17 5-8 3 8H6l5-8h4"/>',
    tennis: '<path d="M15.5 4.5c3 3 3.4 7.5.9 10s-7 2.1-10-.9-3.4-7.5-.9-10 7-2.1 10 .9Z"/><path d="M5.5 3.5 16.5 14.5"/><path d="M4 8h14"/><path d="m14.5 14.5 6 6"/>',
    walk: '<path d="M13 4a2 2 0 1 0 0 4 2 2 0 0 0 0-4Z"/><path d="m10 23 2-7-3-3-3 3"/><path d="m11 10 4 4 4 1"/><path d="m13 16 4 7"/>',
    golf: '<path d="M6 22h12"/><path d="M12 22V4"/><path d="M12 4h7l-2 3 2 3h-7"/><circle cx="17" cy="18" r="1.5"/>',
    social: '<circle cx="8" cy="9" r="3"/><circle cx="17" cy="8" r="2.5"/><path d="M3 21c.8-4 3-6 5-6s4.2 2 5 6"/><path d="M14 14c2.4.4 4.2 2.4 5 6"/>'
  };

  return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${icons[type]}</svg>`;
}

function getClub(id) {
  return golfClubs.find((club) => club.id === id);
}

function getUser(id) {
  return users.find((user) => user.id === id);
}

function getApprovedSlots(teeTimeId) {
  return teeTimeSlots.filter((slot) => slot.teeTimeId === teeTimeId && slot.joinStatus === "approved");
}

function spotsRemaining(teeTime) {
  return teeTime.maxPlayers - getApprovedSlots(teeTime.id).length;
}

function updateTeeTimeStatus(teeTime) {
  if (teeTime.status === "cancelled") return;
  teeTime.status = spotsRemaining(teeTime) <= 0 ? "full" : "open";
}

function formatDate(dateString, timeString) {
  const date = new Date(`${dateString}T${timeString}`);
  return new Intl.DateTimeFormat("en-IE", {
    weekday: "short",
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit"
  }).format(date);
}

function labelFor(value) {
  return value.replace("-", " ");
}

function renderActivities() {
  byId("activityGrid").innerHTML = activities
    .map(
      (activity) => `
        <button class="activity-tile" type="button" data-activity="${activity.name}">
          ${iconSvg(activity.icon)}
          <span>${activity.name}</span>
        </button>
      `
    )
    .join("");
}

function showHome() {
  byId("homeView").hidden = false;
  byId("golfView").hidden = true;
  history.replaceState(null, "", "#home");
}

function showGolf() {
  byId("homeView").hidden = true;
  byId("golfView").hidden = false;
  history.replaceState(null, "", "#golf");
  renderAllGolf();
}

function populateSelects() {
  const clubOptions = golfClubs.map((club) => `<option value="${club.id}">${club.name}</option>`).join("");
  byId("createClub").innerHTML = clubOptions;
  byId("clubFilter").insertAdjacentHTML("beforeend", clubOptions);

  const areas = [...new Set(golfClubs.map((club) => club.area))].sort();
  byId("areaFilter").insertAdjacentHTML(
    "beforeend",
    areas.map((area) => `<option value="${area}">${area}</option>`).join("")
  );

  setCreateDefaults();
}

function setCreateDefaults() {
  const nextWeek = new Date();
  nextWeek.setDate(nextWeek.getDate() + 7);
  byId("createDate").value = nextWeek.toISOString().slice(0, 10);
  byId("createTime").value = "10:00";
  byId("createWomenOnly").checked = true;
  byId("createMaxPlayers").value = 4;
}

function renderJoiners(teeTime) {
  return getApprovedSlots(teeTime.id)
    .map((slot) => {
      const user = getUser(slot.userId);
      const role = slot.role === "host" ? "Host" : "Approved";
      return `
        <div class="joiner">
          <strong>${user.firstName} · ${labelFor(user.level)}</strong>
          <span>${role}. ${user.bio}</span>
        </div>
      `;
    })
    .join("");
}

function renderNextStep(teeTime) {
  const approvedJoiner = teeTimeSlots.some(
    (slot) =>
      slot.teeTimeId === teeTime.id &&
      slot.userId === currentUserId &&
      slot.role === "joiner" &&
      slot.joinStatus === "approved"
  );

  if (!approvedJoiner) return "";

  const club = getClub(teeTime.clubId);
  return `
    <strong>Next step:</strong>
    Complete the actual booking via ${club.name}'s own system.
    <a href="${club.externalBookingUrl}" target="_blank" rel="noreferrer">Open club booking page</a>
  `;
}

function renderNotices() {
  const noticeArea = byId("inAppNotices");
  const visibleNotices = notices.filter((notice) => notice.userId === currentUserId);

  noticeArea.innerHTML = visibleNotices
    .map((notice) => `<div class="app-notice"><strong>${notice.title}</strong> ${notice.message}</div>`)
    .join("");
  noticeArea.hidden = visibleNotices.length === 0;
}

function renderCardActions(teeTime) {
  const existingSlot = teeTimeSlots.find((slot) => slot.teeTimeId === teeTime.id && slot.userId === currentUserId);

  if (teeTime.hostId === currentUserId) {
    return `<button class="danger-button" type="button" data-cancel="${teeTime.id}">Cancel</button>`;
  }

  if (existingSlot?.joinStatus === "requested") {
    return `<button class="secondary-button" type="button" disabled>Request pending</button>`;
  }

  if (existingSlot?.joinStatus === "approved") {
    return `<button class="secondary-button" type="button" disabled>Approved</button>`;
  }

  if (teeTime.status !== "open" || spotsRemaining(teeTime) <= 0) {
    return `<button class="secondary-button" type="button" disabled>Full</button>`;
  }

  return `<button class="primary-button" type="button" data-request="${teeTime.id}">Request to join</button>`;
}

function getFilteredTeeTimes() {
  return teeTimes
    .map((teeTime) => {
      updateTeeTimeStatus(teeTime);
      return teeTime;
    })
    .filter((teeTime) => {
      const club = getClub(teeTime.clubId);
      if (teeTime.status !== "open") return false;
      if (state.filters.club !== "all" && teeTime.clubId !== state.filters.club) return false;
      if (state.filters.area !== "all" && club.area !== state.filters.area) return false;
      if (state.filters.date && teeTime.date !== state.filters.date) return false;
      if (state.filters.level !== "all" && teeTime.level !== state.filters.level) return false;
      if (state.filters.holes !== "all" && String(teeTime.holes) !== state.filters.holes) return false;
      if (state.filters.spotsOnly && spotsRemaining(teeTime) <= 0) return false;
      return true;
    });
}

function renderGolfBoard() {
  const grid = byId("teeGrid");
  const template = byId("teeCardTemplate");
  const openTimes = getFilteredTeeTimes();
  grid.innerHTML = "";

  if (!openTimes.length) {
    grid.innerHTML = `<div class="empty-state">No open groups match these filters.</div>`;
    return;
  }

  openTimes.forEach((teeTime) => {
    const club = getClub(teeTime.clubId);
    const nextStep = renderNextStep(teeTime);
    const card = template.content.firstElementChild.cloneNode(true);
    card.querySelector("h3").textContent = club.name;
    card.querySelector(".seed-badge").hidden = !teeTime.seed;
    card.querySelector(".status-badge").textContent = teeTime.womenOnly ? "Women-only" : "Mixed";
    card.querySelector(".tee-meta").textContent = `${club.area} · ${formatDate(teeTime.date, teeTime.time)} · ${teeTime.holes} holes · ${club.bookingSystem}`;
    card.querySelector(".spots").textContent = `${spotsRemaining(teeTime)} of ${teeTime.maxPlayers} spaces open`;
    card.querySelector(".level").textContent = labelFor(teeTime.level);
    card.querySelector(".notes").textContent = teeTime.notes;
    card.querySelector(".joiners").innerHTML = renderJoiners(teeTime);
    card.querySelector(".next-step").innerHTML = nextStep;
    card.querySelector(".next-step").hidden = !nextStep;
    card.querySelector(".card-actions").innerHTML = renderCardActions(teeTime);
    grid.append(card);
  });
}

function renderRequests() {
  const list = byId("requestList");
  const hostedIds = teeTimes.filter((teeTime) => teeTime.hostId === currentUserId).map((teeTime) => teeTime.id);
  const requests = teeTimeSlots.filter((slot) => hostedIds.includes(slot.teeTimeId) && slot.joinStatus === "requested");

  if (!requests.length) {
    list.innerHTML = `<div class="empty-state">No pending requests for your hosted groups.</div>`;
    return;
  }

  list.innerHTML = requests
    .map((slot) => {
      const teeTime = teeTimes.find((item) => item.id === slot.teeTimeId);
      const club = getClub(teeTime.clubId);
      const user = getUser(slot.userId);
      return `
        <article class="request-item">
          <div>
            <h3>${user.firstName} wants to join ${club.name}</h3>
            <p class="tee-meta">${formatDate(teeTime.date, teeTime.time)} · ${labelFor(user.level)} · ${user.bio}</p>
          </div>
          <div class="card-actions">
            <button class="primary-button" type="button" data-approve="${teeTime.id}:${user.id}">Approve</button>
            <button class="secondary-button" type="button" data-decline="${teeTime.id}:${user.id}">Decline</button>
          </div>
        </article>
      `;
    })
    .join("");
}

function renderAllGolf() {
  renderNotices();
  renderGolfBoard();
  renderRequests();
}

function requestToJoin(teeTimeId) {
  const existing = teeTimeSlots.find((slot) => slot.teeTimeId === teeTimeId && slot.userId === currentUserId);
  if (existing) return;

  teeTimeSlots.push({
    teeTimeId,
    userId: currentUserId,
    role: "joiner",
    joinStatus: "requested",
    joinedAt: new Date().toISOString()
  });
  renderAllGolf();
}

function approveRequest(teeTimeId, userId) {
  const slot = teeTimeSlots.find((item) => item.teeTimeId === teeTimeId && item.userId === userId);
  const teeTime = teeTimes.find((item) => item.id === teeTimeId);
  if (!slot || !teeTime || spotsRemaining(teeTime) <= 0) return;

  slot.joinStatus = "approved";
  updateTeeTimeStatus(teeTime);
  renderAllGolf();
}

function declineRequest(teeTimeId, userId) {
  const slot = teeTimeSlots.find((item) => item.teeTimeId === teeTimeId && item.userId === userId);
  if (slot) slot.joinStatus = "declined";
  renderAllGolf();
}

function cancelTeeTime(teeTimeId) {
  const teeTime = teeTimes.find((item) => item.id === teeTimeId);
  if (!teeTime || teeTime.hostId !== currentUserId) return;

  teeTime.status = "cancelled";
  const club = getClub(teeTime.clubId);
  const approvedJoiners = teeTimeSlots.filter(
    (slot) => slot.teeTimeId === teeTimeId && slot.role === "joiner" && slot.joinStatus === "approved"
  );

  approvedJoiners.forEach((slot) => {
    notices.push({
      userId: slot.userId,
      title: "Group cancelled.",
      message: `${club.name} on ${formatDate(teeTime.date, teeTime.time)} was cancelled by the host.`
    });
  });

  notices.push({
    userId: currentUserId,
    title: "Cancellation sent.",
    message: `${approvedJoiners.length} approved joiner notice${approvedJoiners.length === 1 ? "" : "s"} queued in-app.`
  });
  renderAllGolf();
}

function createTeeTime(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const newId = `t${Date.now()}`;
  const teeTime = {
    id: newId,
    hostId: currentUserId,
    clubId: byId("createClub").value,
    date: byId("createDate").value,
    time: byId("createTime").value,
    holes: Number(byId("createHoles").value),
    maxPlayers: Number(byId("createMaxPlayers").value),
    level: byId("createLevel").value,
    womenOnly: byId("createWomenOnly").checked,
    notes: byId("createNotes").value || "Relaxed, social, no pressure.",
    status: "open",
    createdAt: new Date().toISOString(),
    seed: false
  };

  teeTimes.unshift(teeTime);
  teeTimeSlots.push({
    teeTimeId: newId,
    userId: currentUserId,
    role: "host",
    joinStatus: "approved",
    joinedAt: new Date().toISOString()
  });

  form.reset();
  setCreateDefaults();
  byId("createDialog").close();
  renderAllGolf();
}

function bindEvents() {
  byId("activityGrid").addEventListener("click", (event) => {
    const tile = event.target.closest("[data-activity]");
    if (!tile) return;
    if (tile.dataset.activity === "Golf") showGolf();
  });

  byId("backHome").addEventListener("click", showHome);
  byId("openCreate").addEventListener("click", () => byId("createDialog").showModal());
  byId("closeCreate").addEventListener("click", () => byId("createDialog").close());
  byId("cancelCreate").addEventListener("click", () => byId("createDialog").close());
  byId("createForm").addEventListener("submit", createTeeTime);

  byId("filters").addEventListener("input", () => {
    state.filters.club = byId("clubFilter").value;
    state.filters.area = byId("areaFilter").value;
    state.filters.date = byId("dateFilter").value;
    state.filters.level = byId("levelFilter").value;
    state.filters.holes = byId("holesFilter").value;
    state.filters.spotsOnly = byId("spotsFilter").checked;
    renderGolfBoard();
  });

  document.body.addEventListener("click", (event) => {
    const requestId = event.target.dataset.request;
    const cancelId = event.target.dataset.cancel;
    const approve = event.target.dataset.approve;
    const decline = event.target.dataset.decline;

    if (requestId) requestToJoin(requestId);
    if (cancelId) cancelTeeTime(cancelId);
    if (approve) approveRequest(...approve.split(":"));
    if (decline) declineRequest(...decline.split(":"));
  });
}

function init() {
  renderActivities();
  populateSelects();
  bindEvents();
  if (location.hash === "#golf") {
    showGolf();
  } else {
    showHome();
  }
}

init();
