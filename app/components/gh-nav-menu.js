<header class="gh-nav-menu">
    <div class="gh-nav-menu-details">
        <div class="gh-nav-menu-icon" style={{iconStyle}}></div>
        <div class="gh-nav-menu-details-blog">{{config.blogTitle}}</div>
    </div>
    <div class="gh-nav-menu-search">
        <button class="gh-nav-btn-search" {{action "toggleSearchModal"}} title="Search site (Ctrl/⌘ + K)"><span>{{svg-jar "search" class="w4 h4 fill-midgrey"}}</span></button>
    </div>
</header>

{{#if showSearchModal}}
    {{gh-fullscreen-modal "search"
        close=(action "toggleSearchModal")
        modifier="action wide"}}
{{/if}}

<section class="gh-nav-body">
    <div class="gh-nav-top">
        <ul class="gh-nav-list gh-nav-main">
            <li class="relative">
                <span {{action "transitionToOrRefreshSite" on="click"}}>
                    {{#link-to "site" data-test-nav="site" current-when=isOnSite preventDefault=false}}
                        {{svg-jar "house"}} 预览
                    {{/link-to}}
                </span>
                <a href="{{config.blogUrl}}/" class="gh-secondary-action" title="Open site in new tab" target="_blank">
                    <span>{{svg-jar "expand"}}</span>
                </a>
            </li>
        </ul>
        <ul class="gh-nav-list gh-nav-manage">
            <li class="gh-nav-list-h">网站管理</li>
            <li class="gh-nav-list-new relative">
                {{!-- clicking the Content link whilst on the content screen should reset the filter --}}
                {{#if (eq router.currentRouteName "posts")}}
                    {{#link-to "posts" (query-params type=null author=null tag=null order=null) classNames="active" data-test-nav="posts"}}{{svg-jar "content"}}新增{{/link-to}}
                {{else}}
                    {{#link-to "posts" data-test-nav="posts"}}{{svg-jar "content"}}新增{{/link-to}}
                {{/if}}
                {{#link-to "editor.new" "post" classNames="gh-secondary-action gh-nav-new-post" alt="New story" data-test-nav="new-story"}}<span>{{svg-jar "add-stroke"}}</span>{{/link-to}}
            </li>
            <li>
                {{!-- clicking the Content link whilst on the content screen should reset the filter --}}
                {{#if (eq router.currentRouteName "pages")}}
                    {{#link-to "pages" (query-params type=null author=null tag=null order=null) classNames="active" data-test-nav="pages"}}{{svg-jar "page"}}页面{{/link-to}}
                {{else}}
                    {{#link-to "pages" data-test-nav="pages"}}{{svg-jar "page"}}页面{{/link-to}}
                {{/if}}
            </li>
            {{#if (gh-user-can-admin session.user)}}
                <li>{{#link-to "tags" data-test-nav="tags"}}{{svg-jar "tag"}}标签{{/link-to}}</li>
            {{/if}}
            {{#if (and feature.members (gh-user-can-admin session.user))}}
                <li>
                    {{#link-to "members" current-when="members member" data-test-nav="members"}}{{svg-jar "members"}}Members{{/link-to}}
                </li>
            {{/if}}
            <li>{{#link-to "staff" data-test-nav="staff"}}{{svg-jar "staff"}}管理{{/link-to}}</li>
        </ul>
        {{#if (gh-user-can-admin session.user)}}
            <ul class="gh-nav-list gh-nav-settings">
                <li class="gh-nav-list-h">网站设置</li>
                <li>{{#link-to "settings.general" data-test-nav="settings"}}{{svg-jar "settings"}}基础设置{{/link-to}}</li>
                <li>{{#link-to "settings.design" data-test-nav="design"}}{{svg-jar "paintbrush"}}导航配置{{/link-to}}</li>
                <li>{{#link-to "settings.code-injection" data-test-nav="code-injection"}}{{svg-jar "brackets"}}高级设置{{/link-to}}</li>
                {{!-- <li>{{#link-to "settings.integrations" current-when=isIntegrationRoute data-test-nav="integrations"}}{{svg-jar "modules"}}Integrations{{/link-to}}</li> --}}
                <li class="relative">
                    <button class="gh-secondary-action" title="Toggle Night shift" {{action (toggle "nightShift" this.feature)}}>
                        <span>{{svg-jar "nightshift"}}</span>
                    </button>
                    {{!-- {{#link-to "settings.labs" data-test-nav="labs"}}{{svg-jar "labs"}}Labs{{/link-to}} --}}
                </li>
            </ul>
        {{/if}}

        {{#if showMenuExtension}}
            <ul class="gh-nav-list gh-nav-settings">
                {{#if config.clientExtensions.menu.title}}
                    <li class="gh-nav-list-h">{{config.clientExtensions.menu.title}}</li>
                {{/if}}
                {{#each config.clientExtensions.menu.items as |menuItem| }}
                    <li>
                        <a href="{{menuItem.href}}" target="_blank">{{svg-jar menuItem.icon}}{{menuItem.text}}</a>
                    </li>
                {{/each}}
            </ul>
        {{/if}}

        {{#if showScriptExtension}}
            {{{config.clientExtensions.script.container}}}
            <script src="{{config.clientExtensions.script.src}}"></script>
        {{/if}}
    </div>
    <div class="gh-nav-bottom">
        {{#gh-basic-dropdown horizontalPosition="left" verticalPosition="top" calculatePosition=userDropdownPosition as |dropdown|}}
            {{#dropdown.trigger tagName="div" class="flex items-center outline-0 pointer space-between pa2 pl4 pr3"}}
                <div class="flex-auto flex items-center">
                    <div class="gh-user-avatar relative" style={{background-image-style session.user.profileImageUrl}}>
                        {{#if this.whatsNew.hasNew}}<span class="absolute dib bg-blue ba b--white br-100 gh-whats-new-badge-account"></span>{{/if}}
                    </div>
                    <div class="flex flex-column items-start justify-center">
                        <span class="gh-user-name {{if session.user.name "mb1"}}" title="{{session.user.name}}">{{session.user.name}}</span>
                        <span class="gh-user-email" title="{{session.user.email}}">{{session.user.email}}</span>
                    </div>
                </div>
                {{svg-jar "arrow-down" class="w3 mr1 fill-darkgrey"}}
            {{/dropdown.trigger}}

            {{#dropdown.content class="gh-nav-menu-dropdown"}}
                <ul class="dropdown-menu dropdown-triangle-top" role="menu"
                    {{action dropdown.actions.close on="click" preventDefault=false}}>  
                  
                    <li role="presentation">
                        {{#link-to "staff.user" session.user.slug classNames="dropdown-item" role="menuitem" tabindex="-1" data-test-nav="user-profile"}}
                            {{svg-jar "user-circle"}} 个人设置
                        {{/link-to}}
                    </li>
   
                    {{#if showDropdownExtension}}
                        {{#each config.clientExtensions.dropdown.items as |menuItem| }}
                            {{#if menuItem.divider}}
                                <li class="divider"></li>
                            {{else}}
                                <li role="presentation">
                                    <a href="{{menuItem.href}}" target="_blank" class="dropdown-item {{menuItem.classes}}" role="menuitem" tabindex="-1">
                                        {{svg-jar menuItem.icon}} {{menuItem.text}}
                                    </a>
                                </li>
                            {{/if}}
                        {{/each}}
                    {{/if}}

                    <li role="presentation">
                        {{#link-to "signout" classNames="dropdown-item user-menu-signout" role="menuitem" tabindex="-1"}}
                            {{svg-jar "signout"}} 退出登陆
                        {{/link-to}}
                    </li>
                </ul>
            {{/dropdown.content}}
        {{/gh-basic-dropdown}}
    </div>
</section>

{{gh-tour-item "getting-started"
    target=".gh-nav-main"
    throbberAttachment="middle right"
    popoverTriangleClass="left-top"
    throbberOffset="0px 0px"
}}
