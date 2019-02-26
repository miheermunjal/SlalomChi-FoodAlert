Install the latest NodeJS on rasberrypi:
1. curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
2. sudo apt-get install -y nodejs

Enable SSH and Rasberry PI cam from the rasberry preferences menu.

Enabling SSH proxy:
1. Create a VM in some cloud
2. Make sure VM is publicly available and for SSH
3. On VM: create SSH keys: ssh-keygen -t rsa -f ~/.ssh/key
4. On VM: Edit the /etc/ssh/sshd_config and add in the end of the file this : GatewayPorts yes
5. On PI: Edit the /etc/ssh/sshd_config and add in the end of the file this : GatewayPorts yes
6. On PI: Copy the private key to the PI and run command: chmod 400 key
7. On PI: Run command: ssh -i "RemoteSSHTest.pem" -R \*:<PORT>:localhost:<PORT> [VM_USER]@[VM_IP]
8. Keep that terminal open !!!

Strat the server:
1. clone the repo on PI.
2. npm i
3. npm start
