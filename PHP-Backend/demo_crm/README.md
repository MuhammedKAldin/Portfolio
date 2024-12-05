# Admin Panel Page

> Database Information :
- Managed by ["./config/database.php"]
- MySQL

> Admin Login Information
- Database Table : owner
- email: admin@gmail.com
- pw: 12345


> Site Components :
- Database Table : applications
1) ./config/database.php (["Has-Database-connection-and-settings"])
2) index.php (Contains ["header.php"] / ["sidebar.php"] / ["./dashboard/content.php"] / ["footer.php"])
3) ./dashboard/content.php (Contains ["Default-homepage-of-the-Admin-panel"])
4) sidebar.php (Contains ["./index.php(Default-Homepage)"] / [./services.php] / ["./mobile.php"] )
5) ./services.php (Contains ["SMTP-login-credentials"])
6) ./mobile.php (Contains ["Requests-of-Interested-Customers-Applying-on-Mobile-App"])