---
layout: post
title:  "My macOS Terminal setup"
excerpt: "A guide to setting up terminal on macOS with iTerm and ZSH"
tags: Tools
---

Over the years while using macOS I have come across several different tools which have helped me work and navigate across the terminal faster. I will try to document these here, incase I or someone else needs it in the future.

Although the setup I give here will mostly work with any macOS install, for reference I am currently using macOS Catalina (10.15.4) .

## Why ?

{%include image.html url="/images/terminal-macos-default.png" description="Default Terminal setup in macOS" shadow=true%}

## Prerequisites

### Homebrew

[Homebrew](https://brew.sh/) is a popular command-line package manager for macOS. It will be used for installing ZSH. Install Homebrew using the command :

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install.sh)"
```

## iTerm2

[iTerm2](https://www.iterm2.com) is the terminal application of my choice. It has several features like split panes, command autocompletion built in. Even though I prefer iTerm2 over the default Terminal.app in macOS, this step is completely optional, and the rest of the setup would work even on the default Terminal app as well.

### Installation

1. Go ahead and download iTerm2 zip archive from its [official website](https://www.iterm2.com/downloads.html).
2. Unarchive the downloaded zip, and copy the iTerm2 application to the macOS Applications folder.

### iTerm2 Themes

When you launch iTerm now, it will look not much different from your default Terminal setup. But do not worry, we will be making some appearance tweaks to this.

{%include image.html url="/images/terminal-iterm-default.png" description="Default iTerm2 setup" shadow=true%}

iTerm themes are changed by importing `.itermcolors` format files to iTerm. 

To download the correct color scheme and import it :

1. Go to <https://iterm2colorschemes.com/>, and find a color correct scheme as per your liking.The theme [Nocturnal Winter](https://raw.githubusercontent.com/mbadolato/iTerm2-Color-Schemes/master/schemes/Nocturnal%20Winter.itermcolors) is my personal favorite.
2. Once you find your theme, right click on its link and select the "Save link as..." option, to download it in the `.itermcolors` format.
3. In iTerm2, go to Preferences or press <kbd>Cmd</kbd> <kbd>,</kbd>.
4. Select *Profiles > Colors*. 
5. In the bottom right you will find the *Color Presets...* drowpdown. Import your downloaded `.itermcolors` file by selecting *Import...* from the dropdown. Finally select the theme you just imported from the dropdown.
6. Optionally, in iTerm Preferences, go to *Appearance > General*. In the *Theme* dropdown select *Minimal*. This will make the entire window of the same color and remove the borders.

Once this is done, the iTerm window may or may not look different. This depends completely on the `.itermcolors` color preference file you imported. In my case since the background is black in the color preferences as well, no significant difference is seen. 

{%include image.html url="/images/terminal-iterm-minimal.png" description="iTerm2 after installing custom color preferences" shadow=true%}

Not many colors will be displayed yet. The use of color preferences we imported will become evident once we setup ZSH and its plugins.

### Triggers for Errors, Exceptions, and Warnings

One way we can use colors in our terminal setup is to differentiate Errors, Exceptions and Warnings from rest of the text while going through huge stack traces and application logs. For example try finding the error in the following logfile.

{%include image.html url="/images/terminal-iterm-without-trigger.png" description="Without color triggers" shadow=true%}

One could simply do <kbd>Cmd</kbd><kbd>F</kbd> and search for the term "ERROR", but this is too manual, and moreover you can only do this when you are trying to look for errors or warnings, and not when you don't expect them to show up in your logs or terminal.

To solve this issue, we use iTerm Triggers. A Trigger is an action that is performed when a text matching some regular expression (some search pattern) is received in the terminal window. You can configure a Trigger to perform a wide range of actions which are well documented [here](https://iterm2.com/documentation-triggers.html).

Whenever the terminal window displays a line containing "error", "exception" or "warn", our Trigger will highlight the line in a specific color. To do this, we need to do the following -

1. In iTerm2, go to Preferences (<kbd>Cmd</kbd> <kbd>,</kbd>).
2. Navigate to *Profiles* &#x2192; *Advanced*.
3. Under the section *Triggers* click on *Edit*.
4. Add a new Trigger by clicking on the + button at the bottom left of the window.
5. Select the newly added Trigger in the table and edit the following fields
    * Set the *Regular Expression* as `(?i:.*error.*)`. This means that our trigger will be activated on getting a line containing any word which as `error` in its substring (case insensitive).
    * Select the *Action* as *Highlight Text*.
    * Set desired Text and Background colors under the *Parameters*. (I went with Red text with Transparent background for errors.)
    * Enable the *Instant* checkbox. This will fire the trigger as soon as the matching line occurs.
6. Similarly set Triggers for Exceptions and Warnings.
    * Use `(?i:.*exception.*)` as the regular expression for exceptions. I use Red text for exceptions.
    * Use `(?i:.*(warning|warn).*)` as the regular expression for warnings. I use Orange text for warnings.

Once set, the Triggers should look like this.

{%include image.html url="/images/terminal-iterm-triggers.png" description="Triggers configuration" shadow=true%}

Verify once by perforiming `cat` on any file containing the words "error", "exception" and "warn".

And lets see the logfile example above once more.

{%include image.html url="/images/terminal-iterm-with-triggers.png" description="With color triggers" shadow=true%}


## ZSH

The Z Shell or zsh for short is an alternative to bash, which uptil now was the default shell for macOS. It offers several features, while being backward compatible in terms of how you use bash. It is much more easily customisable and has a huge set of plugins.

macOS 10.15 Catalina and higher have zsh as the default shell. But it might not be the latest version. So make a fresh install of ZSH using Homebrew.

```bash
brew install zsh
```

Check the location of zsh using the `which` command, it should be in `/usr/local/bin/zsh` instead of `/usr/bin/zsh` which is the default zsh on macOS.

```bash
# should print "/usr/local/bin/zsh"
which zsh
```

Append this path to the file `/etc/shells` so that macOS knows of this as a shell option. Once added, verify again that the `/etc/shells` file contains your entry.

```bash
# output should contain the line "/usr/local/bin/zsh"
cat /etc/shells
```

Now change the default login shell to zsh using the following command. It will prompt you for your password.

```bash
chsh -s /usr/local/bin/zsh
```

Restart your computer.

You might be faced with the following prompt on opening iTerm2 again:

```
This is the Z Shell configuration function for new users,
zsh-newuser-install.
You are seeing this message because you have no zsh startup files
(the files .zshenv, .zprofile, .zshrc, .zlogin in the directory
~).  This function can help you with a few settings that should
make your use of the shell easier.

You can:

(q)  Quit and do nothing.  The function will be run again next time.

(0)  Exit, creating the file ~/.zshrc containing just a comment.
     That will prevent this function being run again.

(1)  Continue to the main menu.

   Type one of the keys in parentheses
```

Select option `0`, to just create an empty `~/.zshrc` file.

Verify that you are using `/usr/local/bin/zsh` as your shell using the following command.

```bash
# should print "/usr/local/bin/zsh"
echo $SHELL
```


## oh-my-zsh and plugins

[Oh-My-ZSH](https://ohmyz.sh) is a framework which manages your ZSH Configurations. It helps you in managing zsh themes and plugins as well.

Install it using the following command.

```bash
sh -c "$(curl -fsSL https://raw.github.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
```

After installing you should be greeted by this flashy message.

{%include image.html url="/images/terminal-iterm-omz-install.png" description="Oh My ZSH installation" shadow=true%}

## Powerlevel10k

[Powerlevel10k](https://github.com/romkatv/powerlevel10k) is a high speed, flexible, customizeable theme for ZSH. 

It derives its name from [Powerlevel9k](https://github.com/Powerlevel9k/powerlevel9k), another popular ZSH theme, which is now deprecated and not maintained anymore. Powerlevel10k is (much) faster than Powerlevel9k (hence the higher number in the name).

```bash
git clone --depth=1 https://github.com/romkatv/powerlevel10k.git ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/themes/powerlevel10k
```

Set `ZSH_THEME="powerlevel10k/powerlevel10k"` in the file `~/.zshrc`

Once you set this, close and restart iTerm2. You should be greeted with Powerlevel10k's configuration wizard, which will recommend you to download and use the MesloLGSNF as the fefault font on iTerm. This is required since the default macOS fonts do not support non ASCII characters. 

{%include image.html url="/images/terminal-iterm-powerlevel10k-setup.png" description="Powerlevel10k's configuration wizard" shadow=true%}

Once done, restart iTerm2.

After restarting iTerm2, you will be greeted again by the configuration wizard, which will ask you several preference questions.
(*The right answers to which are left as an exercise to the reader :P*)

Set the configuration wizard as per your preference. Incase you do not like the final outcome, you can reconfigure it again with the following command.

```bash
p10k configure
```

For my setup I have selected the following configurations for Powerlevel10k

Parameter | My choice
--- | ---
Does this look like a diamond ? | Yes
Does this look like a lock ? | Yes
Does this look like a Debian logo ? | Yes
Do all these icons fit between the crosses? | Yes
Prompt Style | Pure
Prompt Colors | Original
Non-permanent content location | Left
Show current time ? |  24-hour format
Prompt Height | Two lines
Prompt Spacing | Sparse
Enable Transient Prompt? | No
Instant Prompt Mode | Verbose
Overwrite ~/.p10k.zsh? | Yes
Apply changes to ~/.zshrc? | Yes

Following the above values, set the terminal to appear as follows.

{%include image.html url="/images/terminal-iterm-powerlevel10k-mine.png" description="Powerlevel10k's all set" shadow=true%}



### Oh My ZSH Plugins

### zsh-autosuggestions

```bash
git clone https://github.com/zsh-users/zsh-autosuggestions ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-autosuggestions
```

### zsh-syntax-higlighting

```bash
git clone https://github.com/zsh-users/zsh-syntax-highlighting.git ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-syntax-highlighting
```

### zsh-completions

```bash
git clone https://github.com/zsh-users/zsh-completions ${ZSH_CUSTOM:=~/.oh-my-zsh/custom}/plugins/zsh-completions
```

{%include image.html url="/images/terminal-macos-final.png" description="My final setup" shadow=true%}

## One last thing