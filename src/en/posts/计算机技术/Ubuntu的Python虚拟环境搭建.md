---
Title: Setting Up a Python Virtual Environment on Ubuntu
Author: Zilong
Date: 2023-09-21 09:21:54
Categories:
- Computer Technology  
Tags:
- Linux  
- Ubuntu  
- Python  
---

## <p align=center>Why Use a Virtual Environment?</p>

This is easy to understand: different projects require different environment setups. Projects may use different versions of Python and a variety of third-party packages. If all these dependencies are mixed together in the same environment, it becomes disorganized and difficult to manage. A virtual environment isolates the dependencies needed for each project, giving it its own independent runtime environment, ensuring no conflicts with other environments.

## <p align=center>Setting Up a Virtual Environment</p>

### 1. Check Your Python Environment

Make sure that Python is already installed on your Linux server. (In this context, "Python" refers to Python 3, as Python 2 has been deprecated and is no longer commonly used.) Different Linux distributions may have slightly different methods for setting up a Python virtual environment. Here, I'll use Ubuntu 20.04.6 as an example.

Run the command `python3 -V` to check your installed Python version. If Python is not installed, the system will prompt you that the "python3" command is not found, and you'll need to install it.

### 2. Install pip

If your server is newly set up or you haven't updated your dependencies in a while, you’ll need to update first by running:

`sudo apt update`

This command will fetch available packages from the cloud to your local machine.

Next, run the following command to install pip:

`apt install python3-pip -y`

Wait for the installation to complete. Then, run `pip3 -V` to verify that pip has been successfully installed.

### 3. Install virtualenvwrapper

virtualenvwrapper is a lightweight Python package manager. To install it, run the following command:

`pip3 install virtualenvwrapper -y`

Once the installation is complete, find out where it was installed by running:

`which virtualenvwrapper.sh`

This will print the installation path for virtualenvwrapper. For example, you might see:

    /usr/local/bin/virtualenvwrapper.sh

### 4. Configure Environment Variables

Open the bashrc file with vim:

`sudo vi ~/.bashrc`

Press the "i" key to enter insert mode, and add the following configuration at the end of the file:

    export VIRTUALENVWRAPPER=/usr/bin/python3
    export WORKON_HOME=/home/venv
    export VIRTUALENVWRAPPER_PYTHON=/usr/bin/python3
    source /usr/local/bin/virtualenvwrapper.sh

**Note: The path after the “source” command should be replaced with the actual path where virtualenvwrapper is installed on your system.**

Press the "Esc" key to exit insert mode, then type `:wq` and hit Enter to save the file.

Finally, run the following command to apply the changes:

`source ~/.bashrc`

At this point, virtualenvwrapper is installed and configured, and you can start using it.

## <p align=center>Commands for Using virtualenvwrapper</p>

You can use the following commands to perform operations on virtual environments:

*   Create a virtual environment: `mkvirtualenv [environment_name]`
*   Activate a virtual environment: `workon [environment_name]`
*   List all virtual environments: `lsvirtualenv`
*   Deactivate the virtual environment: `deactivate`
*   Delete a virtual environment: `rmvirtualenv [environment_name]`

Usually, you only need to use `mkvirtualenv [name]` to create a new virtual environment for a project. Then, if you want to activate the environment, simply use `workon [name]`. It's very convenient!