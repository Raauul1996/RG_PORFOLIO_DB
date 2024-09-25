const { Router } = require('express');
const { db } = require('../firebase');

const router = Router();
const userDataBase = db.collection('user');

router.get('/', (req, res) => {
    res.json('Welcome to my PORTFOLIO API REST');
});

router.get('/users', async (req, res) => {
    try {
        const querySnapshot = await userDataBase.get();
        const allUsers = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data()
        }));

        if (allUsers.length === 0) {
            return res.status(404).json({ error: 'No users found' });
        }

        res.status(200).json(allUsers);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/user/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const userDoc = await userDataBase.doc(id).get();

        if (!userDoc.exists) {
            return res.status(404).json({ error: 'User not found' });
        }

        const { password, ...userData } = userDoc.data();
        res.status(200).json(userData);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/user/:userId/proyects/:projectId', async (req, res) => {
    try {
        const { userId, projectId } = req.params;
        const projectSnapshot = await userDataBase.doc(userId).collection('proyects').doc(projectId).get();

        if (!projectSnapshot.exists) {
            return res.status(404).json({ error: 'Project not found' });
        }

        const project = { id: projectSnapshot.id, ...projectSnapshot.data() };
        res.status(200).json({ project });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
