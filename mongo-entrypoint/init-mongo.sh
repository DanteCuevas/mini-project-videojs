## FOR MONGO version > 4
mongo -u "admin" -p "pass" admin <<EOF
    use videodb;
    db.createUser({
        user: 'videousr',
        pwd: 'videopwd',
        roles: [{role: 'readWrite', db: 'videodb'}],
    });
    use videodbtest;
    db.createUser({
        user: 'videousrtest',
        pwd: 'videopwdtest',
        roles: [{role: 'readWrite', db: 'videodbtest'}],
    });
EOF