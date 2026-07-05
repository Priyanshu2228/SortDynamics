// ====== Algorithm Data ======
const ALGO_DATA = {
  bubble: {
    name: 'Bubble Sort', badge: '🫧', tag: 'Comparison · In-place',
    desc: 'Repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order. The largest elements "bubble up" to the end.',
    best: 'O(n)', avg: 'O(n²)', worst: 'O(n²)', space: 'O(1)',
    stable: true, inPlace: true, adaptive: true,
    useCase: 'Teaching sorting concepts. Very small datasets. When simplicity matters more than performance.',
    pseudo: `for i = 0 to n-1
  for j = 0 to n-i-2
    if arr[j] > arr[j+1]
      swap(arr[j], arr[j+1])`
  },
  selection: {
    name: 'Selection Sort', badge: '🎯', tag: 'Comparison · In-place',
    desc: 'Divides the array into sorted and unsorted parts. Repeatedly finds the minimum from the unsorted part and places it at the beginning of the sorted part.',
    best: 'O(n²)', avg: 'O(n²)', worst: 'O(n²)', space: 'O(1)',
    stable: false, inPlace: true, adaptive: false,
    useCase: 'Small arrays where memory writes are costly. When auxiliary memory is very limited.',
    pseudo: `for i = 0 to n-1
  minIdx = i
  for j = i+1 to n-1
    if arr[j] < arr[minIdx]
      minIdx = j
  swap(arr[i], arr[minIdx])`
  },
  insertion: {
    name: 'Insertion Sort', badge: '📥', tag: 'Comparison · Adaptive',
    desc: 'Builds the sorted array one item at a time by inserting each element into its correct position among the already-sorted elements.',
    best: 'O(n)', avg: 'O(n²)', worst: 'O(n²)', space: 'O(1)',
    stable: true, inPlace: true, adaptive: true,
    useCase: 'Small arrays or nearly sorted data. Used as a subroutine in Timsort & Shellsort. Online sorting.',
    pseudo: `for i = 1 to n-1
  key = arr[i]
  j = i - 1
  while j >= 0 and arr[j] > key
    arr[j+1] = arr[j]
    j = j - 1
  arr[j+1] = key`
  },
  quick: {
    name: 'Quick Sort', badge: '⚡', tag: 'Divide & Conquer · Recursive',
    desc: 'Picks a pivot element and partitions the array around it, then recursively sorts sub-arrays. One of the fastest algorithms in practice.',
    best: 'O(n log n)', avg: 'O(n log n)', worst: 'O(n²)', space: 'O(log n)',
    stable: false, inPlace: true, adaptive: false,
    useCase: 'General-purpose sorting. Large datasets. When average performance is critical. Used in most standard libraries.',
    pseudo: `quicksort(lo, hi):
  if lo < hi
    p = partition(lo, hi)
    quicksort(lo, p-1)
    quicksort(p+1, hi)`
  },
  merge: {
    name: 'Merge Sort', badge: '🔀', tag: 'Divide & Conquer · Stable',
    desc: 'Divides the array into halves, recursively sorts each half, then merges the sorted halves. Guarantees O(n log n) in all cases.',
    best: 'O(n log n)', avg: 'O(n log n)', worst: 'O(n log n)', space: 'O(n)',
    stable: true, inPlace: false, adaptive: false,
    useCase: 'Linked lists. External sorting (files). When stability is required. Parallel sorting algorithms.',
    pseudo: `mergesort(lo, hi):
  if lo >= hi: return
  mid = (lo + hi) / 2
  mergesort(lo, mid)
  mergesort(mid+1, hi)
  merge(lo, mid, hi)`
  },
  heap: {
    name: 'Heap Sort', badge: '📚', tag: 'Comparison · In-place',
    desc: 'Builds a max-heap from the array, then repeatedly extracts the maximum element to produce a sorted array. Guaranteed O(n log n).',
    best: 'O(n log n)', avg: 'O(n log n)', worst: 'O(n log n)', space: 'O(1)',
    stable: false, inPlace: true, adaptive: false,
    useCase: 'When guaranteed O(n log n) and O(1) space is needed. Real-time systems. Priority queue implementations.',
    pseudo: `buildMaxHeap(arr)
for i = n-1 downto 1
  swap(arr[0], arr[i])
  heapify(arr, i, 0)`
  }
};

// ====== UI Elements ======
const elAlgo       = document.getElementById('algo');
const elSize       = document.getElementById('size');
const elSpeed      = document.getElementById('speed');
const btnGen       = document.getElementById('btnGen');
const btnRun       = document.getElementById('btnRun');
const btnStop      = document.getElementById('btnStop');
const sizeDisplay  = document.getElementById('sizeDisplay');
const speedDisplay = document.getElementById('speedDisplay');
const statComps    = document.getElementById('statComps');
const statSwaps    = document.getElementById('statSwaps');
const statTime     = document.getElementById('statTime');

// Sidebar info elements
const algoBadge    = document.getElementById('algoBadge');
const algoName     = document.getElementById('algoName');
const algoTag      = document.getElementById('algoTag');
const algoDesc     = document.getElementById('algoDesc');
const cpxBest      = document.getElementById('cpxBest');
const cpxAvg       = document.getElementById('cpxAvg');
const cpxWorst     = document.getElementById('cpxWorst');
const cpxSpace     = document.getElementById('cpxSpace');
const traitStable  = document.getElementById('traitStable');
const traitInPlace = document.getElementById('traitInPlace');
const traitAdaptive= document.getElementById('traitAdaptive');
const useCaseEl    = document.getElementById('useCase');
const pseudoCode   = document.getElementById('pseudoCode');
const stateStatus  = document.getElementById('stateStatus');
const stateSize    = document.getElementById('stateSize');
const stateSpeed   = document.getElementById('stateSpeed');
const statePass    = document.getElementById('statePass');
const stateStep    = document.getElementById('stateStep');
const statusBadge  = document.getElementById('statusBadge');
const canvasAlgoLabel = document.getElementById('canvasAlgoLabel');
const progressFill = document.getElementById('progressFill');
const progressPct  = document.getElementById('progressPct');

// DOM container
const boxContainer    = document.getElementById('boxContainer');
const visualizerFloor = document.getElementById('visualizerFloor');

// ====== Update Algorithm Info Panel ======
function updateAlgoInfo(key) {
  const d = ALGO_DATA[key];
  if (!d) return;

  const cards = document.querySelectorAll('.algo-card, .complexity-card, .traits-card, .use-card, .pseudo-card');
  cards.forEach(c => { c.style.opacity = '0'; c.style.transform = 'translateY(8px)'; });

  setTimeout(() => {
    algoBadge.textContent       = d.badge;
    algoName.textContent        = d.name;
    algoTag.textContent         = d.tag;
    algoDesc.textContent        = d.desc;
    cpxBest.textContent         = d.best;
    cpxAvg.textContent          = d.avg;
    cpxWorst.textContent        = d.worst;
    cpxSpace.textContent        = d.space;
    useCaseEl.textContent       = d.useCase;
    pseudoCode.textContent      = d.pseudo;
    canvasAlgoLabel.textContent = d.name;

    setTrait(traitStable,   d.stable,   'Stable');
    setTrait(traitInPlace,  d.inPlace,  'In-place');
    setTrait(traitAdaptive, d.adaptive, 'Adaptive');

    cards.forEach(c => {
      c.style.transition = 'opacity 300ms ease, transform 300ms ease';
      c.style.opacity    = '1';
      c.style.transform  = 'translateY(0)';
    });
  }, 160);
}

function setTrait(el, val, label) {
  el.textContent = val ? `✓ ${label}` : `✗ ${label}`;
  el.className   = `trait-item ${val ? 'trait-yes' : 'trait-no'}`;
}

// ====== Global State ======
let arr = [], boxes = [];
let running = false;
let speed = 1;
let sz = 48, gap = 10;
let baseY = 0;          // Y coordinate of the floor (top of boxes sitting on it)
let comparisons = 0, swaps = 0, startTime = 0;
let currentPass = 0, currentStep = 0;
let sortedSet = new Set();
let timerInterval = null;

// ====== Responsive Sizing ======
// FIX: Guard against zero-dimension container (called before first paint).
function calcLayout() {
  const W = boxContainer.clientWidth  || boxContainer.offsetWidth  || 600;
  const H = boxContainer.clientHeight || boxContainer.offsetHeight || 320;
  const n = boxes.length || parseInt(elSize.value, 10) || 10;

  // Box width: fit all n boxes with minimum 4px gap each side
  const available = W - 32; // 16px padding each side
  const maxSz = Math.floor((available - (n - 1) * 4) / n);
  sz  = Math.max(28, Math.min(60, maxSz));
  gap = Math.max(4, Math.min(14, Math.floor(sz * 0.2)));

  // baseY: Y pixel from container top where boxes sit (bottom of boxes = floor)
  // floor is 60px from bottom; boxes sit on top of floor
  baseY = H - 70; // top of a box = baseY - sz
}

function layoutBoxes() {
  if (!boxes.length) return;
  calcLayout();

  const n = boxes.length;
  const total = n * sz + (n - 1) * gap;
  const startX = Math.max(0, (boxContainer.clientWidth - total) / 2);

  for (let i = 0; i < n; i++) {
    const b = boxes[i];
    b.targetX = Math.round(startX + i * (sz + gap));
    b.targetY = baseY - sz;   // top-left Y of box (box bottom = baseY)

    b.el.style.width    = sz + 'px';
    b.el.style.height   = sz + 'px';
    b.el.style.fontSize = Math.max(11, Math.round(sz * 0.38)) + 'px';
    // Use left/top positioning instead of transform for initial placement
    // to avoid any transform-parsing bugs at startup
    b.el.style.transform = `translate(${b.targetX}px, ${b.targetY}px)`;
  }
}

// ====== Box State Management ======
const ALL_STATES = [
  'unsorted','comparing','swapping','sorted',
  'pivot','minimum','insertion-key','merge-section','heap-boundary'
];

function setBoxState(idx, state) {
  if (idx < 0 || idx >= boxes.length) return;
  const el = boxes[idx].el;
  ALL_STATES.forEach(s => el.classList.remove(s));
  if (state) el.classList.add(state);
}

function clearAllStates() {
  for (let i = 0; i < boxes.length; i++) setBoxState(i, 'unsorted');
}

function clearTempStates() {
  for (let i = 0; i < boxes.length; i++) {
    if (!sortedSet.has(i)) setBoxState(i, 'unsorted');
  }
}

// ====== Generate ======
function gen() {
  // Stop any running sort
  running = false;
  sortedSet.clear();

  const n = parseInt(elSize.value, 10);
  const vals = Array.from({ length: n }, () => Math.floor(Math.random() * 89) + 10); // 2-digit numbers
  arr = vals.slice();

  // Remove previous boxes
  const old = boxContainer.querySelectorAll('.box-element');
  old.forEach(el => el.remove());

  // Create one persistent DOM element per value
  boxes = vals.map(v => {
    const el = document.createElement('div');
    el.className = 'box-element unsorted';
    el.innerHTML = `<span class="box-val">${v}</span>`;
    boxContainer.appendChild(el);
    return { val: v, el, targetX: 0, targetY: 0 };
  });

  // FIX: Use requestAnimationFrame to ensure the container has painted
  // and clientWidth/clientHeight are valid before computing layout.
  requestAnimationFrame(() => {
    layoutBoxes();
  });

  resetStats();
  stateSize.textContent = n;
  setStatus('ready');
  setProgress(0);
}

// ====== Easing ======
function easeInOut(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

// ====== Delay ======
function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, Math.max(1, ms)));
}

// ====== Core: Animate a box smoothly to a new position ======
// Reads current position from box.targetX / box.targetY (always kept in sync).
function animateBox(box, toX, toY, toR, durationMs) {
  return new Promise(resolve => {
    if (!running) { resolve(); return; }

    const fromX = box.targetX;
    const fromY = box.targetY;
    // Parse current rotation from transform string
    const m = (box.el.style.transform || '').match(/rotate\(([-\d.]+)deg\)/);
    const fromR = m ? parseFloat(m[1]) : 0;

    const t0 = performance.now();

    function step(now) {
      if (!running) {
        // Snap to final position even when stopped
        box.el.style.transform = `translate(${toX}px, ${toY}px) rotate(0deg)`;
        resolve();
        return;
      }
      const raw = (now - t0) / durationMs;
      const t   = Math.min(1, raw);
      const k   = easeInOut(t);

      const cx = fromX + (toX - fromX) * k;
      const cy = fromY + (toY - fromY) * k;
      const cr = fromR + (toR - fromR) * k;

      box.el.style.transform = `translate(${cx}px, ${cy}px) rotate(${cr}deg)`;

      if (t < 1) {
        requestAnimationFrame(step);
      } else {
        box.el.style.transform = `translate(${toX}px, ${toY}px) rotate(${toR === 0 ? 0 : toR}deg)`;
        resolve();
      }
    }

    requestAnimationFrame(step);
  });
}

// ====== Highlight Compare ======
// Sets both elements to 'comparing', waits briefly, then restores them.
// Does NOT call resolve until the flash is done so every comparison is visible.
async function highlightCompare(i, j) {
  if (!running) return;
  comparisons++;
  updateStats();

  // Remember what state to restore
  const stateI = sortedSet.has(i) ? 'sorted' : boxes[i].el.classList.contains('pivot') ? 'pivot' : boxes[i].el.classList.contains('minimum') ? 'minimum' : 'unsorted';
  const stateJ = sortedSet.has(j) ? 'sorted' : boxes[j].el.classList.contains('pivot') ? 'pivot' : boxes[j].el.classList.contains('minimum') ? 'minimum' : 'unsorted';

  setBoxState(i, 'comparing');
  setBoxState(j, 'comparing');

  await wait(Math.max(50, 220 / speed));

  if (!running) return;
  setBoxState(i, stateI);
  setBoxState(j, stateJ);
}

// ====== Rolling Swap Animation ======
// Left box arcs over-the-top of the right box (rolling); right box slides under.
// After animation: boxes[] and arr[] are both swapped at indices i, j.
async function animSwap(i, j) {
  if (!running) return;
  swaps++;
  updateStats();

  const left  = Math.min(i, j);
  const right = Math.max(i, j);
  const bL = boxes[left];
  const bR = boxes[right];

  setBoxState(left,  'swapping');
  setBoxState(right, 'swapping');

  // Capture start positions
  const lX = bL.targetX, lY = bL.targetY;
  const rX = bR.targetX, rY = bR.targetY;

  const dist   = rX - lX;
  const jumpH  = Math.min(sz * 2.0, 40 + dist * 0.35);
  const durMs  = Math.max(200, 480 / speed);
  const t0     = performance.now();

  bL.el.style.zIndex = '30';
  bR.el.style.zIndex = '10';

  await new Promise(resolve => {
    function step(now) {
      const raw = (now - t0) / durMs;
      const t   = Math.min(1, raw);
      const k   = easeInOut(t);

      // Roller (left → right): arc + full 360° rotation
      const rlX = lX + dist * k;
      const rlY = lY - Math.sin(t * Math.PI) * jumpH;
      const rlR = k * 360;
      bL.el.style.transform = `translate(${rlX}px, ${rlY}px) rotate(${rlR}deg)`;

      // Slider (right → left): linear slide
      const slK = easeInOut(Math.min(1, t * 1.1));
      const slX = rX + (lX - rX) * slK;
      bR.el.style.transform = `translate(${slX}px, ${rY}px) rotate(0deg)`;

      if (t < 1 && running) {
        requestAnimationFrame(step);
      } else {
        // Snap to final positions
        bL.el.style.transform = `translate(${rX}px, ${lY}px) rotate(0deg)`;
        bR.el.style.transform = `translate(${lX}px, ${rY}px) rotate(0deg)`;
        bL.el.style.zIndex = '';
        bR.el.style.zIndex = '';

        // Update data model
        bL.targetX = rX;
        bR.targetX = lX;
        // Swap sorted-set membership
        const lWas = sortedSet.has(left);
        const rWas = sortedSet.has(right);
        sortedSet.delete(left);
        sortedSet.delete(right);
        if (lWas) sortedSet.add(right);
        if (rWas) sortedSet.add(left);

        // Swap logical array
        [arr[left],   arr[right]]   = [arr[right],   arr[left]];
        // Swap boxes array
        [boxes[left], boxes[right]] = [boxes[right], boxes[left]];

        // Restore visual state
        setBoxState(left,  sortedSet.has(left)  ? 'sorted' : 'unsorted');
        setBoxState(right, sortedSet.has(right) ? 'sorted' : 'unsorted');

        resolve();
      }
    }
    requestAnimationFrame(step);
  });
}

// ====== Insertion Sort: Shift-and-Insert Animation ======
// Lifts key, slides sorted elements right, drops key into position.
// FIX: Does all data mutations before any animation to avoid index corruption.
async function animInsertionShift(keyIdx, targetIdx) {
  if (!running || keyIdx === targetIdx) return;

  const keyBox = boxes[keyIdx];
  const keyVal = arr[keyIdx];
  const keyTargetX = keyBox.targetX; // remember key's original X
  swaps += (keyIdx - targetIdx);
  updateStats();

  setBoxState(keyIdx, 'insertion-key');

  const durMs = Math.max(100, 280 / speed);

  // Step 1: Lift the key element above the row
  const liftY = baseY - sz - sz * 1.6;
  keyBox.el.style.zIndex = '25';
  // Animate lift (update targetY so animateBox reads it correctly)
  await new Promise(resolve => {
    const fromY = keyBox.targetY;
    const t0    = performance.now();
    function step(now) {
      const t = Math.min(1, (now - t0) / durMs);
      const k = easeInOut(t);
      const cy = fromY + (liftY - fromY) * k;
      keyBox.el.style.transform = `translate(${keyTargetX}px, ${cy}px)`;
      if (t < 1 && running) requestAnimationFrame(step);
      else { keyBox.el.style.transform = `translate(${keyTargetX}px, ${liftY}px)`; resolve(); }
    }
    requestAnimationFrame(step);
  });
  if (!running) return;

  // Step 2: Slide elements from [targetIdx .. keyIdx-1] one step to the right simultaneously.
  // Capture their positions first.
  const shiftPromises = [];
  for (let k = keyIdx - 1; k >= targetIdx; k--) {
    const b    = boxes[k];
    const toX  = boxes[k + 1].targetX; // slide into the slot to its right
    const fromX = b.targetX;
    const fromY = b.targetY;
    shiftPromises.push(new Promise(resolve => {
      const t0 = performance.now();
      function step(now) {
        const t = Math.min(1, (now - t0) / durMs);
        const k2 = easeInOut(t);
        b.el.style.transform = `translate(${fromX + (toX - fromX) * k2}px, ${fromY}px)`;
        if (t < 1 && running) requestAnimationFrame(step);
        else { b.el.style.transform = `translate(${toX}px, ${fromY}px)`; resolve(); }
      }
      requestAnimationFrame(step);
    }));
  }
  await Promise.all(shiftPromises);
  if (!running) return;

  // Commit data shift (right-to-left so we don't overwrite before reading)
  for (let k = keyIdx; k > targetIdx; k--) {
    arr[k]   = arr[k - 1];
    boxes[k] = boxes[k - 1];
    boxes[k].targetX = boxes[k].el.style.transform.match(/translate\(([-\d.]+)px/) ?
      parseFloat(boxes[k].el.style.transform.match(/translate\(([-\d.]+)px/)[1]) :
      boxes[k].targetX;
  }

  // Place key at targetIdx
  arr[targetIdx]   = keyVal;
  boxes[targetIdx] = keyBox;

  const dropX = boxes[targetIdx + 1] !== keyBox
    ? boxes[targetIdx + 1 <= keyIdx ? targetIdx + 1 : targetIdx].targetX - sz - gap
    : keyBox.targetX;

  // Recalculate targetX from layout formula
  const total  = boxes.length * sz + (boxes.length - 1) * gap;
  const startX = Math.max(0, (boxContainer.clientWidth - total) / 2);
  const dropXCalc = Math.round(startX + targetIdx * (sz + gap));
  keyBox.targetX = dropXCalc;

  // Step 3: Slide key horizontally to target column (still elevated)
  await new Promise(resolve => {
    const fromX = keyTargetX;
    const t0    = performance.now();
    function step(now) {
      const t  = Math.min(1, (now - t0) / durMs);
      const k2 = easeInOut(t);
      keyBox.el.style.transform = `translate(${fromX + (dropXCalc - fromX) * k2}px, ${liftY}px)`;
      if (t < 1 && running) requestAnimationFrame(step);
      else { keyBox.el.style.transform = `translate(${dropXCalc}px, ${liftY}px)`; resolve(); }
    }
    requestAnimationFrame(step);
  });
  if (!running) return;

  // Step 4: Drop key down
  const floorY = baseY - sz;
  keyBox.targetY = floorY;
  await new Promise(resolve => {
    const t0 = performance.now();
    function step(now) {
      const t  = Math.min(1, (now - t0) / durMs);
      const k2 = easeInOut(t);
      const cy = liftY + (floorY - liftY) * k2;
      keyBox.el.style.transform = `translate(${dropXCalc}px, ${cy}px)`;
      if (t < 1 && running) requestAnimationFrame(step);
      else { keyBox.el.style.transform = `translate(${dropXCalc}px, ${floorY}px)`; resolve(); }
    }
    requestAnimationFrame(step);
  });

  keyBox.el.style.zIndex = '';
}

// ====== UI helpers ======
function setUI(disabled) {
  btnGen.disabled  = disabled;
  btnRun.disabled  = disabled;
  elAlgo.disabled  = disabled;
  elSize.disabled  = disabled;
}

function setStatus(s) {
  const labels = { ready: '● Ready', running: '⟳ Running…', done: '✓ Done!', stopped: '⏹ Stopped' };
  stateStatus.textContent  = labels[s] || s;
  stateStatus.className    = `state-val status-${s}`;
  statusBadge.textContent  = labels[s] || s;
  statusBadge.className    = `canvas-status ${s === 'ready' ? '' : s}`;
}

function setProgress(pct) {
  const p = Math.min(100, Math.max(0, Math.round(pct)));
  progressFill.style.width = p + '%';
  progressPct.textContent  = p + '%';
}

// ====== Stats ======
function updateStats() {
  statComps.textContent = comparisons;
  statSwaps.textContent = swaps;
}

function startTimer() {
  startTime = Date.now();
  if (timerInterval) clearInterval(timerInterval);
  timerInterval = setInterval(() => {
    statTime.textContent = (Date.now() - startTime) + 'ms';
  }, 100);
}

function stopTimer() {
  if (timerInterval) { clearInterval(timerInterval); timerInterval = null; }
  if (startTime > 0) statTime.textContent = (Date.now() - startTime) + 'ms';
}

function resetStats() {
  comparisons = 0; swaps = 0; startTime = 0;
  statComps.textContent = '0';
  statSwaps.textContent = '0';
  statTime.textContent  = '0ms';
}

// ====== Event Listeners ======
elAlgo.addEventListener('change', () => {
  updateAlgoInfo(elAlgo.value);
  canvasAlgoLabel.textContent = ALGO_DATA[elAlgo.value].name;
});

elSize.addEventListener('input', () => {
  sizeDisplay.textContent = elSize.value;
  stateSize.textContent   = elSize.value;
});

elSpeed.addEventListener('input', () => {
  speed = parseFloat(elSpeed.value);
  speedDisplay.textContent = speed + '×';
  stateSpeed.textContent   = speed + '×';
});

btnGen.onclick = gen;

btnRun.onclick = async () => {
  if (running) return;
  if (!boxes.length) { gen(); await wait(100); } // ensure boxes exist
  running = true;
  setUI(true);
  sortedSet.clear();
  clearAllStates();
  speed = parseFloat(elSpeed.value);
  resetStats();
  startTimer();
  setStatus('running');
  setProgress(0);
  currentPass = 0; currentStep = 0;

  try {
    const algo = elAlgo.value;
    if      (algo === 'bubble')    await sortBubble();
    else if (algo === 'selection') await sortSelection();
    else if (algo === 'insertion') await sortInsertion();
    else if (algo === 'quick')     await sortQuick();
    else if (algo === 'merge')     await sortMerge();
    else if (algo === 'heap')      await sortHeap();

    if (running) {
      // Final sweep: mark all sorted
      for (let i = 0; i < boxes.length; i++) {
        sortedSet.add(i);
        setBoxState(i, 'sorted');
        await wait(Math.max(15, 50 / speed));
      }
      setStatus('done');
      setProgress(100);
    }
  } finally {
    running = false;
    stopTimer();
    setUI(false);
    statePass.textContent = '—';
    stateStep.textContent = '—';
  }
};

btnStop.onclick = () => {
  running = false;
  stopTimer();
  setUI(false);
  clearTempStates();
  setStatus('stopped');
};

window.addEventListener('resize', () => {
  if (boxes.length && !running) {
    calcLayout();
    layoutBoxes();
  }
});

// ====== Sorting Algorithms ======

// ---- Bubble Sort ----
async function sortBubble() {
  const n = arr.length;
  for (let i = 0; i < n - 1 && running; i++) {
    currentPass = i + 1;
    statePass.textContent = currentPass;
    let swapped = false;

    for (let j = 0; j < n - i - 1 && running; j++) {
      currentStep = j + 1;
      stateStep.textContent = currentStep;

      await highlightCompare(j, j + 1);

      if (arr[j] > arr[j + 1]) {
        await animSwap(j, j + 1);
        swapped = true;
      }
      setProgress((i * (n - 1) + j) / ((n - 1) * (n - 1)) * 100);
    }

    sortedSet.add(n - 1 - i);
    setBoxState(n - 1 - i, 'sorted');
    if (!swapped) break;
  }
  if (running) { sortedSet.add(0); setBoxState(0, 'sorted'); }
}

// ---- Selection Sort ----
async function sortSelection() {
  const n = arr.length;
  for (let i = 0; i < n - 1 && running; i++) {
    currentPass = i + 1;
    statePass.textContent = currentPass;
    let minIdx = i;
    setBoxState(i, 'minimum');

    for (let j = i + 1; j < n && running; j++) {
      currentStep = j;
      stateStep.textContent = currentStep;
      comparisons++;
      updateStats();

      setBoxState(j, 'comparing');
      await wait(Math.max(50, 200 / speed));
      if (!running) break;

      if (arr[j] < arr[minIdx]) {
        setBoxState(minIdx, sortedSet.has(minIdx) ? 'sorted' : 'unsorted');
        minIdx = j;
        setBoxState(minIdx, 'minimum');
      } else {
        setBoxState(j, 'unsorted');
      }
    }

    if (!running) break;

    if (minIdx !== i) {
      await animSwap(i, minIdx);
    } else {
      setBoxState(i, 'unsorted');
    }

    sortedSet.add(i);
    setBoxState(i, 'sorted');
    setProgress(i / (n - 1) * 100);
  }
  if (running) { sortedSet.add(n - 1); setBoxState(n - 1, 'sorted'); }
}

// ---- Insertion Sort ----
async function sortInsertion() {
  const n = arr.length;
  sortedSet.add(0);
  setBoxState(0, 'sorted');

  for (let i = 1; i < n && running; i++) {
    currentPass = i;
    statePass.textContent = currentPass;

    const keyVal = arr[i];
    let insertPos = i;

    setBoxState(i, 'insertion-key');
    await wait(Math.max(50, 150 / speed));

    let j = i - 1;
    while (j >= 0 && running) {
      currentStep = j;
      stateStep.textContent = currentStep;
      comparisons++;
      updateStats();

      setBoxState(j, 'comparing');
      await wait(Math.max(40, 140 / speed));
      if (!running) break;

      if (arr[j] > keyVal) {
        setBoxState(j, sortedSet.has(j) ? 'sorted' : 'unsorted');
        insertPos = j;
        j--;
      } else {
        setBoxState(j, sortedSet.has(j) ? 'sorted' : 'unsorted');
        break;
      }
    }

    if (!running) break;

    if (insertPos !== i) {
      await animInsertionShift(i, insertPos);
    } else {
      setBoxState(i, 'unsorted');
    }

    if (!running) break;

    // Mark the sorted prefix
    for (let k = 0; k <= i; k++) {
      sortedSet.add(k);
      setBoxState(k, 'sorted');
    }
    setProgress(i / (n - 1) * 100);
  }
}

// ---- Quick Sort ----
// FIX: Track pivot index explicitly so it always highlights the right element.
async function sortQuick() {
  const n = arr.length;

  // Returns the final pivot index
  async function partition(lo, hi) {
    let pivotIdx = hi;            // pivot starts at hi
    setBoxState(pivotIdx, 'pivot');

    let ip = lo;                  // insert pointer

    for (let j = lo; j < hi && running; j++) {
      currentStep = j;
      stateStep.textContent = currentStep;

      // Compare j against pivot
      comparisons++;
      updateStats();
      const stateJ = boxes[j].el.classList.contains('pivot') ? 'pivot' : 'unsorted';
      setBoxState(j, 'comparing');
      await wait(Math.max(50, 200 / speed));
      if (!running) return ip;
      setBoxState(j, sortedSet.has(j) ? 'sorted' : stateJ);

      if (arr[j] < arr[pivotIdx]) {
        if (ip !== j) {
          // Neither ip nor j is the pivot (pivot is at hi, ip ≤ j < hi)
          await animSwap(ip, j);
        }
        ip++;
      }
    }

    // Swap pivot into its final position
    if (ip !== hi && running) {
      // If pivot moved during above swaps, find it
      await animSwap(ip, pivotIdx);
      pivotIdx = ip; // pivot is now at ip
    } else {
      pivotIdx = ip;
    }

    setBoxState(pivotIdx, 'unsorted');
    return pivotIdx;
  }

  async function qs(lo, hi, depth) {
    if (!running || lo >= hi) return;
    currentPass = depth;
    statePass.textContent = depth;

    const p = await partition(lo, hi);
    sortedSet.add(p);
    setBoxState(p, 'sorted');
    setProgress(sortedSet.size / n * 100);

    await qs(lo, p - 1, depth + 1);
    await qs(p + 1, hi, depth + 1);
  }

  await qs(0, n - 1, 1);
}

// ---- Merge Sort ----
// FIX: Use simple adjacent swaps (rotation) to move elements.
// This keeps boxes[] and arr[] always in sync without complex index arithmetic.
async function sortMerge() {
  const n = arr.length;

  async function merge(lo, mid, hi) {
    // Highlight the two sub-sections being merged
    for (let k = lo; k <= mid; k++) setBoxState(k, 'merge-section');
    for (let k = mid + 1; k <= hi; k++) setBoxState(k, 'comparing');
    await wait(Math.max(60, 180 / speed));
    if (!running) return;

    let i = lo;
    let j = mid + 1;

    while (i <= mid && j <= hi && running) {
      comparisons++;
      updateStats();
      currentStep = j;
      stateStep.textContent = currentStep;

      // Brief compare flash
      setBoxState(i, 'comparing');
      setBoxState(j, 'comparing');
      await wait(Math.max(40, 130 / speed));
      if (!running) return;

      if (arr[i] <= arr[j]) {
        // Left element is already in place
        setBoxState(i, 'merge-section');
        i++;
      } else {
        // Right element (j) needs to move to position i.
        // Rotate it leftward one step at a time until it reaches i.
        // Each step is an adjacent swap — this keeps the data model simple.
        let pos = j;
        while (pos > i && running) {
          await animSwap(pos - 1, pos);
          pos--;
        }
        // After rotation, element is at i, and mid/j both shifted right by 1
        mid++;
        j++;
        i++;
      }
    }

    // Clear merge-section highlight
    for (let k = lo; k <= hi; k++) {
      setBoxState(k, sortedSet.has(k) ? 'sorted' : 'unsorted');
    }
  }

  async function ms(lo, hi, depth) {
    if (lo >= hi || !running) return;
    currentPass = depth;
    statePass.textContent = depth;

    const m = Math.floor((lo + hi) / 2);
    await ms(lo, m, depth + 1);
    if (!running) return;
    await ms(m + 1, hi, depth + 1);
    if (!running) return;
    await merge(lo, m, hi);

    if (running) {
      for (let k = lo; k <= hi; k++) sortedSet.add(k);
      setProgress(sortedSet.size / n * 100);
    }
  }

  await ms(0, n - 1, 1);
}

// ---- Heap Sort ----
async function sortHeap() {
  const n = arr.length;

  async function heapify(heapSize, i) {
    if (!running) return;
    let largest = i;
    const l = 2 * i + 1;
    const r = 2 * i + 2;

    if (l < heapSize) {
      comparisons++;
      updateStats();
      setBoxState(i, 'heap-boundary');
      setBoxState(l, 'comparing');
      await wait(Math.max(30, 90 / speed));
      if (!running) return;
      if (arr[l] > arr[largest]) largest = l;
      setBoxState(l, sortedSet.has(l) ? 'sorted' : 'unsorted');
    }

    if (r < heapSize) {
      comparisons++;
      updateStats();
      setBoxState(i, 'heap-boundary');
      setBoxState(r, 'comparing');
      await wait(Math.max(30, 90 / speed));
      if (!running) return;
      if (arr[r] > arr[largest]) largest = r;
      setBoxState(r, sortedSet.has(r) ? 'sorted' : 'unsorted');
    }

    setBoxState(i, sortedSet.has(i) ? 'sorted' : 'unsorted');

    if (largest !== i && running) {
      await animSwap(i, largest);
      await heapify(heapSize, largest);
    }
  }

  // Build max-heap
  for (let i = Math.floor(n / 2) - 1; i >= 0 && running; i--) {
    currentPass = i;
    statePass.textContent = 'Build ' + i;
    await heapify(n, i);
  }

  // Extract elements one by one
  for (let i = n - 1; i > 0 && running; i--) {
    currentStep = i;
    stateStep.textContent   = i;
    currentPass = n - i;
    statePass.textContent = 'Extract ' + (n - i);

    setBoxState(0, 'heap-boundary');
    setBoxState(i, 'comparing');
    await wait(Math.max(40, 110 / speed));
    if (!running) break;

    await animSwap(0, i);

    sortedSet.add(i);
    setBoxState(i, 'sorted');
    setProgress((n - i) / n * 100);

    await heapify(i, 0);
  }

  if (running) { sortedSet.add(0); setBoxState(0, 'sorted'); }
}

// ====== Boot ======
// FIX: Initialise after the browser has completed first layout pass.
// This guarantees boxContainer.clientWidth/Height are non-zero for calcLayout().
updateAlgoInfo('bubble');
sizeDisplay.textContent  = elSize.value;
speedDisplay.textContent = speed + '×';
stateSpeed.textContent   = speed + '×';

// Defer gen() to after first paint so container dimensions are valid
requestAnimationFrame(() => {
  requestAnimationFrame(() => {
    gen();
  });
});
