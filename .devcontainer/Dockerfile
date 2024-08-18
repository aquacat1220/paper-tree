FROM node:latest

RUN apt-get update && apt-get upgrade -y

# Remove existing non-root user.
RUN if (id -nu 1000); then userdel -r $(id -nu 1000); fi

# Setup non-root user.
ARG host_username=anonymous_kitten

RUN useradd --create-home --shell /bin/bash -G sudo ${host_username}
RUN apt-get install -y sudo
RUN echo "${host_username}:${host_username}" | chpasswd
USER ${host_username}
WORKDIR /home/${host_username}

# Entrypoint is an interactive shell.
ENTRYPOINT ["/bin/bash", "-i"]
