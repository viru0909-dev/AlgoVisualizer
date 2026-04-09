const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

let newLayout = `<nav class="navbar navbar-inverse" style="z-index:101; position:relative;">
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
          <button id="path-help-btn" style="background:#334155;color:#cbd5e1;border:none;padding:4px 11px;border-radius:6px;font-weight:600;font-size:12px;cursor:pointer;transition:all .2s;display:inline-flex;align-items:center;gap:5px;">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
            How to Use
          </button>
        </li>
        <li style="display:flex;align-items:center;">
          <button id="toggleCodePanelBtn" style="background:#334155;color:#fff;border:none;padding:5px 13px;border-radius:6px;font-weight:600;font-size:12px;cursor:pointer;transition:background .2s;font-family:'Inter',sans-serif;display:inline-flex;align-items:center;gap:5px;">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
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

     <button id='startButtonAddObject' class="sm-btn" style="background:#334155; color:#f8fafc;">Add Bomb</button>

     <div class="ctrl-sep"></div>

     <button id="actualStartButton" class="sm-btn" type="button" style="background:#059669!important;color:#fff!important;font-weight:700!important;padding:6px 20px!important;transition:all .2s ease!important;box-shadow:0 4px 10px rgba(5,150,105,.35)!important;font-size:13px;display:inline-flex;align-items:center;gap:6px;"><svg class="ctrl-btn-icon" viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="6,3 20,12 6,21"/></svg> Visualize!</button>

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
       <label style="margin-right:8px; margin-bottom:0;">Speed:</label>
       <div class="speed-pill-container" id="speedDisplay" style="display:flex; gap:4px; align-items:center;">
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

// Delete the old nav code
let divStart = html.indexOf("<div id='navbarDiv'>");
let nextDivEnd = html.indexOf("</nav>", divStart);
let finalEnd = html.indexOf("</div>", nextDivEnd) + 6; // To cover </div>

if (divStart !== -1 && finalEnd !== -1) {
    let before = html.substring(0, divStart);
    let after = html.substring(finalEnd);
    let newHtml = before + "<div id='navbarDiv'>\n  " + newLayout + "\n</div>" + after;
    // Also patch the workspace-container height
    newHtml = newHtml.replace("height: calc(100vh - 50px);", "height: calc(100vh - 52px - 52px);");
    fs.writeFileSync('index.html', newHtml);
    console.log("Navbar fix applied successfully.");
} else {
    console.log("Could not find start/end.");
}
