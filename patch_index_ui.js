const fs = require('fs');
let html = fs.readFileSync('/Users/virendragadekar/Desktop/AlgoVisualizer/index.html', 'utf8');

// Replace CSS
html = html.replace(/\.navbar-inverse \{[\s\S]*?z-index: 1000;\n      display: flex;\n      flex-direction: column;\n      gap: 10px;\n    \}/, 
`    .navbar-inverse{background-color:#1e293b;border-color:transparent;margin-bottom:0!important;}
    .navbar-inverse .navbar-brand{color:#f8fafc!important;font-weight:700;letter-spacing:.5px;}
    .navbar .container-fluid{display:flex;align-items:center;padding:0 20px;}
    .nav.navbar-nav{display:flex;align-items:center;flex-direction:row;margin:0;gap:4px;}
    .nav-mode-tab{display:inline-flex;align-items:center;gap:5px;padding:5px 14px;border-radius:6px;font-size:13px;font-weight:600;text-decoration:none;transition:all .2s;color:#cbd5e1;}
    .nav-mode-tab:hover{color:#fff;background:rgba(255,255,255,.08);}
    .nav-mode-tab.active{background:#10b981;color:#fff!important;}

    /* ── CONTROLS BAR ── */
    #ctrl-bar{background:#1e293b;border-top:1px solid #334155;border-bottom:1px solid #334155;padding:0 24px;display:flex;align-items:center;height:52px;gap:1.5rem;flex-wrap:nowrap;position:relative;z-index:100;}
    #ctrl-bar label{color:#cbd5e1;font-weight:600;font-size:13px;white-space:nowrap;}
    .ctrl-select{background:#334155;color:#f8fafc;border:1px solid #475569;padding:4px 10px;border-radius:6px;font-size:13px;font-weight:600;font-family:'Inter',sans-serif;outline:none;cursor:pointer;height:30px;}
    .ctrl-sep{width:1px;height:24px;background:#334155;flex-shrink:0;}

    /* Buttons */
    .ctrl-btn-icon{width:14px;height:14px;flex-shrink:0;vertical-align:middle;position:relative;top:-1px;}
    .sm-btn{background:#334155;color:#f8fafc;border:none;padding:5px 14px;border-radius:6px;font-weight:600;font-size:12px;cursor:pointer;font-family:'Inter',sans-serif;transition:all .2s ease;white-space:nowrap;display:inline-flex;align-items:center;gap:5px;}
    .sm-btn:hover{background:#475569;transform:translateY(-1px);}

    .dropdown-menu {
      background-color: #ffffff !important;
      padding: 0 !important;
      margin: 0 !important;
      border-radius: 8px !important;
      overflow: hidden !important;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15) !important;
      min-width: 220px !important;
      border: none !important;
    }
    .dropdown-menu > li {
      background-color: transparent !important;
      padding: 0 !important;
      margin: 0 !important;
      width: 100% !important;
      display: block !important;
      border: none !important;
    }
    .dropdown-menu > li > a {
      display: block !important;
      width: 100% !important;
      box-sizing: border-box !important;
      padding: 12px 16px !important;
      color: #333333 !important;
      text-align: left !important;
      text-decoration: none !important;
      background-color: transparent !important;
      font-weight: 600 !important;
      transition: background-color 0.2s ease, color 0.2s ease !important;
    }
    .dropdown-menu > li > a:hover {
      background-color: #10b981 !important;
      color: #ffffff !important;
    }

    #algo-hover-card {
      position: absolute;
      width: 300px;
      background: rgba(255, 255, 255, 0.95);
      backdrop-filter: blur(8px);
      -webkit-backdrop-filter: blur(8px);
      border-radius: 12px;
      box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1);
      border: 1px solid #e2e8f0;
      padding: 16px;
      pointer-events: none;
      opacity: 0;
      transform: translateY(10px) translateX(10px);
      transition: opacity 0.2s ease, transform 0.2s ease;
      z-index: 1000;
      display: flex;
      flex-direction: column;
      gap: 10px;
    }`);

// Replace navbar HTML area
let startToken = `<div id='navbarDiv'>`;
let endToken = `</nav>\n    </div>`;

let newNavbarHTML = `<nav class="navbar navbar-inverse" style="z-index:101; position:relative;">
  <div class="container-fluid">
    <div class="navbar-header">
      <a class="navbar-brand" href="/" id="refreshButton">algoVisualizer</a>
    </div>
    <ul class="nav navbar-nav" style="gap:4px;">
      <li><a href="/"        class="nav-mode-tab active"><svg class="ctrl-btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg> Pathfinding</a></li>
      <li><a href="/nqueens" class="nav-mode-tab"><svg class="ctrl-btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg> N-Queens</a></li>
      <li><a href="/sorting" class="nav-mode-tab"><svg class="ctrl-btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg> Sorting</a></li>
    </ul>
    <ul class="nav navbar-nav" style="margin-left:auto;gap:8px;">
      <li style="display:flex;align-items:center;">
        <button id="toggleCodePanelBtn" style="background:#334155;color:#cbd5e1;border:none;padding:4px 11px;border-radius:6px;font-weight:600;font-size:12px;cursor:pointer;transition:all .2s;display:inline-flex;align-items:center;gap:5px;">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
          Code Tracker
        </button>
      </li>
    </ul>
  </div>
</nav>

<div id="ctrl-bar">
   <div class="dropdown">
     <button class="ctrl-select dropdown-toggle" data-toggle="dropdown" style="display:inline-flex; align-items:center; gap:5px;">Algorithms <span class="caret"></span></button>
     <ul class="dropdown-menu">
       <li id='startButtonDijkstra'><a href="#">Dijkstra's Algorithm</a></li>
       <li id='startButtonAStar2'><a href="#">A* Search</a></li>
       <li id='startButtonGreedy'><a href="#">Greedy Best-first Search</a></li>
       <li id='startButtonAStar'><a href="#">Swarm Algorithm</a></li>
       <li id='startButtonAStar3'><a href="#">Convergent Swarm Algorithm</a></li>
       <li id='startButtonBidirectional'><a href="#">Bidirectional Swarm Algorithm</a></li>
       <li id='startButtonBFS'><a href="#">Breadth-first Search</a></li>
       <li id='startButtonDFS'><a href="#">Depth-first Search</a></li>
     </ul>
   </div>

   <div class="dropdown">
     <button class="ctrl-select dropdown-toggle" data-toggle="dropdown" style="display:inline-flex; align-items:center; gap:5px;">Mazes &amp; Patterns <span class="caret"></span></button>
     <ul class="dropdown-menu">
       <li id='startButtonCreateMazeTwo'><a href="#">Recursive Division</a></li>
       <li id='startButtonCreateMazeThree'><a href="#">Recursive Division (vertical skew)</a></li>
       <li id='startButtonCreateMazeFour'><a href="#">Recursive Division (horizontal skew)</a></li>
       <li id='startButtonCreateMazeOne'><a href="#">Basic Random Maze</a></li>
       <li id='startButtonCreateMazeWeights'><a href="#">Basic Weight Maze</a></li>
       <li id='startStairDemonstration'><a href="#">Simple Stair Pattern</a></li>
     </ul>
   </div>

   <button id='startButtonAddObject' class="sm-btn">Add Bomb</button>

   <div class="ctrl-sep"></div>

   <button id="actualStartButton" class="btn btn-default" type="button" style="background:#059669!important;border:none!important;color:#fff!important;font-weight:700!important;border-radius:6px!important;padding:6px 20px!important;transition:all .2s ease!important;box-shadow:0 4px 10px rgba(5,150,105,.35)!important;font-size:13px;font-family:'Inter',sans-serif;margin:0;">Visualize!</button>

   <div class="ctrl-sep"></div>

   <div class="dropdown">
     <button class="ctrl-select dropdown-toggle" data-toggle="dropdown" style="display:inline-flex; align-items:center; gap:5px;">Reset <span class="caret"></span></button>
     <ul class="dropdown-menu">
       <li id='startButtonClearBoard'><a href="#">Clear Board</a></li>
       <li id='startButtonClearWalls'><a href="#">Clear Walls & Weights</a></li>
       <li id='startButtonClearPath'><a href="#">Clear Path</a></li>
     </ul>
   </div>

   <div style="display: flex; align-items: center; margin-left: auto;">
     <span style="color: #cbd5e1; margin-right: 10px; font-weight: 600; font-size:13px;">Speed:</span>
     <div class="speed-pill-container" id="speedDisplay">
       <button type="button" class="btn btn-default speed-pill-btn" id="startButtonSpeedSlow" title="Slow" style="background-color: transparent; border-radius: 9999px;">
         <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color:#94a3b8"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 8 14"/></svg>
       </button>
       <button type="button" class="btn btn-default speed-pill-btn" id="startButtonSpeedAverage" title="Average" style="background-color: transparent; border-radius: 9999px;">
         <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color:#94a3b8"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
       </button>
       <button type="button" class="btn btn-default speed-pill-btn" id="startButtonSpeedFast" title="Fast" style="background-color: #e2e8f0; border-radius: 9999px;">
         <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color:#1e293b"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
       </button>
     </div>
     <span id="adjustSpeed" style="display:none;"></span>
   </div>
</div>`;

let startIndex = html.indexOf(startToken);
let endIndex = html.indexOf(endToken) + endToken.length;

if(startIndex > -1 && endIndex > -1) {
    html = html.substring(0, startIndex) + newNavbarHTML + html.substring(endIndex);
    fs.writeFileSync('/Users/virendragadekar/Desktop/AlgoVisualizer/index.html', html);
    console.log("Success index.html applied");
} else {
    console.log("Could not find navbar tags");
}

