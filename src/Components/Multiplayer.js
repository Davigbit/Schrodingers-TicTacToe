import { Peer } from 'peerjs'

export function initializePeer(peer) {
	if (!peer) {
		peer = new Peer()
		peer.on('open', function(id) {
			console.log('My ID is : ' + id);
		});

	}

	return peer;
}

export function initiateConnection(conId, conn, peer,setisInitiator) {
	if (!conn) {
		console.log(peer);
		conn = peer.connect(conId);
		conn.on('open', function() {
			console.log('connected to ' + conn.peer)
			setisInitiator(true);
		}); 
	} else {
		console.log('already connected to ' + conn);
	}
	return conn;
}


export function RecieveConnection(peer, conn, setConn,setisInitiator, setOtherGrid) {
	if (!conn) {
		peer.on('connection', function(c) {
			setConn(c);
			setisInitiator(false);
			console.log('connected to ' + c.peer);
		});
	} else {

		conn.on('close', function() {
			console.log('connection terminated');
			setConn(null);
			setisInitiator(null);
		})
	}	
}

export function Disconnect(conn, setisDisconnecting) {
	if (conn) {
		conn.close();
	} else {
		console.log("You're not connected to anything, dummy!");
	}
}

export function send(conn, Grid) {
	conn.send(Grid);
}