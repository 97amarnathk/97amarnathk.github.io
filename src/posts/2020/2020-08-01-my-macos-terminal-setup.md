---
title: My macOS terminal setup
date: 2020-08-01
tags: ["Tools"]
excerpt: "A guide to setting up terminal on macOS with iTerm and ZSH"
published: true
---

After several years of using macOS I have come across some tools which have helped me use the terminal faster. I will try to document these here, incase I or someone else needs it in the future.

Although I am currently using macOS Catalina (10.15.4), the setup I give here should work with any recent macOS version

## Why ?

Before changing the properties of the terminal, we should be aware of what we are changing and why we are doing it. Many people think that the goal is to make the terminal more "pretty", "fun" and "colorful". I feel that these should not be the goals (even though they are some of the desirable side effects). The goal is to make our terminal usage more effective.

Some things to keep in mind while making modifications:

1. **Don't make it slow** - Installing your theme or plugins to your terminal should not impact the speed. Your terminal should not get "prettier", at the cost of speed.
2. **Keep it familiar** - Occassionally someone else might need to use the terminal on your computer. So make sure that while adding features, you are not breaking the regular terminal workflow. A person not fimilar with your terminal should still be able to use it in the same way as the default setup (backward-compatible, for the lack of a better word).

That said, there are some _bottlenecks_ in the default terminal :

1. **Takes too long to read** - Since all text in the terminal looks alike, its hard to read, and understand different pieces of information conveyed by it. For example, differentiating a long command from its output takes some time. Another example is that while reading stack traces, finding ERROR in the huge pile of text takes considerable time. Thats where color coding your terminal text comes in the picture (making the terminal "pretty" as a side effect)

2. **Keeping track of commands** - Many times we have long commands, which are not easy to remember. You might note them down in a separate place, for future reference, or keep aliases. These are some ways to deal with this problem. But we can leave the responsibility of keeping track of our commands to the terminal application itself (The command `history` does this, but adds an extra step of searching manually). This is where autosuggestions come into the picture.

{%include image.html url="/images/terminal-macos-default.png" description="Default Terminal in macOS" shadow=true%}

## Prerequisites

### Take a backup of your dotfiles

Your command line settings (if you have any), are stored in the form of dotfiles (`.bashrc` if you are using bash, or `.zshrc` incase you already have zsh). Installation of Oh My ZSH and ZSH plugins will involve making changes to the dotfiles. Therefore it is a good idea to take backup of these, incase you need to revert or copy some part of your old dotfiles to the new ones.

```bash
mkdir ~/backups

# if you use zsh and the following files are defined
cp ~/.zshrc ~/backups/zshrc
cp ~/.zsh_profile ~/backups/zsh_profile

# if you use bashrc and the following files are
cp ~/.bashrc ~/backups/bashrc
cp ~/.bashrc ~/backups/bash_profile
```

### Xcode or Xcode CLI tools

For installing Homebrew, you need to have either Xcode or Xcode CLI tools installed. Xcode can be installed from the macOS App store. Install Xcode CLI tools using the command

```bash
xcode-select --install
```

### Homebrew

[Homebrew](https://brew.sh/) is a popular command-line package manager for macOS. It will be used for installing ZSH. Install Homebrew using the command

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install.sh)"
```

## iTerm2

[iTerm2](https://www.iterm2.com) is a terminal application I use. It has several features like split panes, command autocompletion built in. Even though I prefer iTerm2 over the default Terminal.app in macOS, this step is completely optional, and the rest of the setup would work even on the default Terminal app.

### Installation

1. Download iTerm2 zip archive from its [official website](https://www.iterm2.com/downloads.html).
2. Unarchive the zip, and copy the iTerm2 application to the _Applications_ directory.

### iTerm2 color presets

When you launch iTerm first time, it will look same as the default Terminal app. We will be making changes to the theme and color scheme, by importing color presets.

{%include image.html url="/images/terminal-iterm-default.png" description="Default iTerm2 setup" shadow=true%}

iTerm colors are changed by importing `.itermcolors` files which contain color presets.

To download the correct color presets and import :

1. Go to <https://iterm2colorschemes.com/>, and find a color correct scheme as per your liking. [Nocturnal Winter](https://raw.githubusercontent.com/mbadolato/iTerm2-Color-Schemes/master/schemes/Nocturnal%20Winter.itermcolors) is my personal favorite, and I have used this in the screenshots of my terminal.
2. Once you find your theme, right click on its link and select the _Save link as_ option, to download it in the `.itermcolors` format.
3. In iTerm2, go to Preferences or press <kbd>Cmd</kbd> <kbd>,</kbd>.
4. Select _Profiles_ &#x2192; _Colors_.
5. In the bottom right corner you will find the _Color Presets_ drowpdown. Import your downloaded `.itermcolors` file by selecting _Import_ from the dropdown. Finally select the theme you just imported from the dropdown again.
6. Optionally, in iTerm Preferences, go to _Appearance_ &#x2192; _General_. In the _Theme_ dropdown select _Minimal_. This will make the entire window of the same color and remove borders.

The iTerm window may or may not look different now. This depends on the `.itermcolors` color preference file you imported. In my case since the background is black in the color preferences as well, no significant difference is seen.

{%include image.html url="/images/terminal-iterm-minimal.png" description="iTerm2 after installing custom color preferences" shadow=true%}

Not many colors will be displayed yet. The use of color preferences we imported will be used once we setup ZSH and its plugins.

### Triggers for Errors, Exceptions, and Warnings

One way we can use colors in our terminal setup is to differentiate Errors, Exceptions and Warnings from rest of the text while going through stack traces and application logs. For example ,try finding the error in the following logfile.

{%include image.html url="/images/terminal-iterm-without-trigger.png" description="Without color triggers" shadow=true%}

One could simply do <kbd>Cmd</kbd><kbd>F</kbd> and search for the term "ERROR", but this is too manual. Moreover you can only do this when you are trying to look for errors or warnings, and not when you don't expect them to show up in your logs or terminal.

To solve this issue, we use iTerm Triggers.

A Trigger is an action that is performed when a text matching some regular expression (some search pattern) is received in the terminal window. You can configure a Trigger to perform a wide range of actions which are well documented [here](https://iterm2.com/documentation-triggers.html).

When the terminal window displays a line containing "error", "exception" or "warn", our Trigger should highlight the line in a specific color. Create this trigger in the following way -

1. In iTerm2, go to Preferences (<kbd>Cmd</kbd> <kbd>,</kbd>).
2. Navigate to _Profiles_ &#x2192; _Advanced_.
3. Under the section _Triggers_ click on _Edit_.
4. Add a new Trigger by clicking on the + button at the bottom left of the window.
5. Select the newly added Trigger in the table and edit the following fields
   - Set the _Regular Expression_ as `(?i:.*error.*)`. This means that our trigger will be activated on getting a line containing any word which as `error` in its substring (case insensitive).
   - Select the _Action_ as _Highlight Text_.
   - Set desired Text and Background colors under the _Parameters_. (I went with Red text with Transparent background for errors.)
   - Enable the _Instant_ checkbox. This will fire the trigger as soon as the matching line occurs.
6. Similarly set Triggers for Exceptions and Warnings.
   - Use `(?i:.*exception.*)` as the regular expression for exceptions. I use Red text for exceptions.
   - Use `(?i:.*(warning|warn).*)` as the regular expression for warnings. I use Orange text for warnings.

Once set, the Triggers should look like this.

{%include image.html url="/images/terminal-iterm-triggers.png" description="Triggers configuration" shadow=true%}

Verify that the triggers are working by performing `cat` on any file containing the words "error", "exception" and "warn".

Lets see the logfile example above, this time with triggers enabled.

{%include image.html url="/images/terminal-iterm-with-triggers.png" description="With color triggers" shadow=true%}

## ZSH

The Z Shell or zsh for short is an alternative to bash, which till recently was the default shell for macOS. It offers several features, while being backward compatible in terms of how you use bash. It is much more easily customisable and has a huge set of plugins.

macOS 10.15 Catalina and higher have zsh as the default shell. But it might not be the latest version. So make a fresh install of ZSH using Homebrew.

1. Install ZSH using brew

```bash
brew install zsh
```

2. Check the location of zsh using the `which` command, it should be in `/usr/local/bin/zsh` instead of `/usr/bin/zsh` which is the default zsh on macOS.

```bash
# should print "/usr/local/bin/zsh"
which zsh
```

3. Append this path to the file `/etc/shells` so that macOS knows of this as a shell option. Once added, verify again that the `/etc/shells` file contains your entry.

```bash
# output should contain the line "/usr/local/bin/zsh"
cat /etc/shells
```

4. Now change the default login shell to zsh using the following command. It will prompt you for your password.

```bash
chsh -s /usr/local/bin/zsh
```

5. Restart your computer.

6. You might be faced with the following prompt on opening iTerm2 again.

```
This is the Z Shell configuration function for new users,
zsh-newuser-install.
You are seeing this message because you have no zsh startup files
(the files .zshenv, .zprofile, .zshrc, .zlogin in the directory
~). This function can help you with a few settings that should
make your use of the shell easier.
You can:
(q)  Quit and do nothing.  The function will be run again next time.
(0)  Exit, creating the file ~/.zshrc containing just a comment.
     That will prevent this function being run again.
(1)  Continue to the main menu.
Type one of the keys in parentheses
```

7. Select option `0`, to just create an empty `~/.zshrc` file.

8. Verify that you are using `/usr/local/bin/zsh` as your shell using the following command.

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

1. Use the following command to install Powerlevel10k

```bash
git clone --depth=1 https://github.com/romkatv/powerlevel10k.git ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/themes/powerlevel10k
```

2. Set `ZSH_THEME="powerlevel10k/powerlevel10k"` in the file `~/.zshrc`

3. Close and restart iTerm2.

4. You should be greeted with Powerlevel10k's configuration wizard, which will recommend you to download and use the MesloLGSNF as the fefault font on iTerm. This is required since the default macOS fonts do not support non ASCII characters.

{%include image.html url="/images/terminal-iterm-powerlevel10k-setup.png" description="Powerlevel10k's configuration wizard" shadow=true%}

Once the font is installed -

1. Restart iTerm2.

2. You will be greeted again by the configuration wizard, which will ask you several preference questions.
   (_The right answers to which are left as an exercise to the reader :P_)

3. Set the configuration wizard as per your preference. Incase you do not like the final outcome, you can reconfigure it again with the following command.

```bash
p10k configure
```

For my setup I have selected the following configurations for Powerlevel10k

| Parameter                                   | My choice      |
| ------------------------------------------- | -------------- |
| Does this look like a diamond ?             | Yes            |
| Does this look like a lock ?                | Yes            |
| Does this look like a Debian logo ?         | Yes            |
| Do all these icons fit between the crosses? | Yes            |
| Prompt Style                                | Pure           |
| Prompt Colors                               | Original       |
| Non-permanent content location              | Left           |
| Show current time ?                         | 24-hour format |
| Prompt Height                               | Two lines      |
| Prompt Spacing                              | Sparse         |
| Enable Transient Prompt?                    | No             |
| Instant Prompt Mode                         | Verbose        |
| Overwrite ~/.p10k.zsh?                      | Yes            |
| Apply changes to ~/.zshrc?                  | Yes            |

With the above values, Powerlevel10k sets the terminal to appear as follows.

{%include image.html url="/images/terminal-iterm-powerlevel10k-mine.png" description="Powerlevel10k's all set" shadow=true%}

### Plugins for ZSH

ZSH has a vast collection of plugins for different use cases. You can find a well maintained list of ZSH plugins [here](https://github.com/unixorn/awesome-zsh-plugins). Here I will be mentioning two plugins which I feel are must-haves.

> Adding plugins can make your terminal slower and less responsive, so only add the essential plugins.

### zsh-autosuggestions

[zsh-autosuggestions](https://github.com/zsh-users/zsh-autosuggestions) provides you with command suggestions as you are typing the command. It stores the commands you use over time and uses these to predict the command you are typing. When you press the <kbd>&#x2192;</kbd> key, the command is completed.

It comes handy for very long bash commands. Instead of noting these commands down in some notepad, you can directly type some keyword you remember from the command, and zsh-autosuggestions will almost always suggest you the right command.

To install zsh-autosuggestions on Oh My ZSH -

1. Use the following command -

```bash
git clone https://github.com/zsh-users/zsh-autosuggestions ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-autosuggestions
```

2. Enable the plugin by going to your `~/.zshrc` file. It contains a variable named `plugins`, which is a space separated tuple of plugin names. Add `zsh-autosuggestions` to this tuple like this.

```bash
# before changes : plugins=(some-plugin another-plugin)
plugins=(some-plugin another-plugin zsh-autosuggestions)
```

3. Source the modified .zshrc file with
   ```bash
       source ~/.zshrc
   ```

To verify, type some big command like below once, and run it.

```bash
echo "Hey there, this is Amarnath"
```

Then, the next time when you just type `echo "H`, you should get the previous command as an inline suggestion.
Inline suggestions would look something like shown below. Just press the <kbd>&#x2192;</kbd> key to take the suggestion, and your command will be completed.

{%include image.html url="/images/terminal-iterm-zsh-autosuggestions.png" description="Inline suggestions given by zsh-autosuggestions" shadow=true%}

### zsh-syntax-higlighting

[zsh-syntax-highlighting](https://github.com/zsh-users/zsh-syntax-highlighting) provides syntax highlighting for all the zsh/bash commands you type in the interactive shell. This helps you in knowing when you typed a syntactically incorrect command even before you complete typing it.

To use zsh-syntax-highlighting -

1. Install zsh-syntax-highlighting with the command

   ```bash
       git clone https://github.com/zsh-users/zsh-syntax-highlighting.git ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-syntax-highlighting
   ```

2. Add `zsh-syntax-highlighting` to the `plugins` variable, defined in `~/.zshrc` file.

   ```bash
       #before changes : plugins=(some-plugin another-plugin)
       plugins=(some-plugin another-plugin zsh-syntax-highlighting)
   ```

3. Source the modified zshrc file with

   ```bash
       source ~/.zshrc
   ```

{%include image.html url="/images/terminal-iterm-zsh-syntax-highlighting.png" description="zsh-syntax-highlighting in action" shadow=true%}

## Putting back exports and aliases

The final step is to add back all the aliases and exported variables you were previously using , back to the file `~/.zshrc`.

### exports

For exported variables, go to the backup of your previous dotfiles, copy the exports and place them at the end of the `~/.zshrc` file.

One thing to keep in mind is the export for `PATH` variable. This variable will change frequently as and when you install new tools and libraries. These exports should automatically get appended to the `~/.zshrc` file by the installation script of the tool/library. But on the off change, that the library is still not available, you might need to add an export to the `PATH` variable manually.

### aliases

You can copy the aliases manually in a similar manner, but there a better way to maintain your custom aliases.

1. Create a new file `~/.zsh_aliases`, and place all your aliases here.
2. Source this file at the end of `~/.zshrc`. This will ensure that in future whenever you change your ZSH configuration again, instead of copying all the aliases manually, you will just need to source the `~/.zsh_aliases` file at the end.

```bash
# at the end of ~/.zshrc
source ~/.zsh_aliases
```

Further extending this idea, you can have separate alias files for your work and personal projects, meaning that when you switch jobs, you just need to delete the work alias file. This again left as an exercise to the reader :P
