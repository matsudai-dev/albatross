FROM debian:bookworm-backports

RUN apt update -y && apt install -y curl npm sudo tzdata unzip vim zip sqlite3
RUN npm install -g n
RUN n 24

RUN groupadd -g 1001 dev-user
RUN useradd -m -g 1001 -u 1001 dev-user -s /bin/bash

RUN usermod -aG sudo dev-user
RUN echo "dev-user ALL=(ALL:ALL) NOPASSWD:ALL" > /etc/sudoers.d/dev-user
RUN chmod 440 /etc/sudoers.d/dev-user

RUN ln -sf /usr/share/zoneinfo/Asia/Tokyo /etc/localtime && echo "Asia/Tokyo" > /etc/timezone
RUN echo "export TZ=Asia/Tokyo" >> /etc/profile.d/env.sh

USER dev-user
RUN mkdir -p /home/dev-user/dev
WORKDIR /home/dev-user/dev

ENV BUN_INSTALL="/home/dev-user/.bun"
ENV PATH="$BUN_INSTALL/bin:${PATH}"
RUN curl -fsSL https://bun.sh/install | bash

RUN bun install -g wrangler
RUN bunx playwright install --with-deps

RUN echo "source /etc/profile.d/env.sh" >> /home/dev-user/.bashrc
