import { Routes, Route } from 'react-router-dom';

import { Home, PassLogin, PassRegister, PassRegisterSuccess, Blog, About, PassVault, Virus, Music, Notes, NotFound, TopBar, HardwareHacking, Purt, Chess } from './pages/index';

function App() {
	return (
		<div className="layout">
			<TopBar />
			<div className="content">
				<Routes>
					<Route path="/" element={<About />} />
					<Route path="/pass/login" element={<PassLogin />} />
					<Route path="/pass/register" element={<PassRegister />} />
					<Route path="/pass/vault" element={<PassVault />} />
					<Route path="/pass/registerSuccess" element={<PassRegisterSuccess />} />
					<Route path="/blog" element={<Blog />} />
					<Route path="/about" element={<About />} />
					<Route path="/virus" element={<Virus />} />
					<Route path="/music" element={<Music />} />
					<Route path="/notes" element={<Notes />} />
               		<Route path="/HardwareHacking" element={<HardwareHacking />} />
               		<Route path="/Purt" element={<Purt />} />
              		<Route path="/Chess" element={<Chess /> } />
					<Route path="/*" element={<NotFound />} />
				</Routes>
			</div>
		</div>
	);
}

export default App;
