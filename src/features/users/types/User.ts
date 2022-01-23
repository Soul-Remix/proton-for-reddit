export interface User {
  accept_followers: boolean;
  awardee_karma: number;
  awarder_karma: number;
  can_create_subreddit: boolean;
  can_edit_name: boolean;
  coins: number;
  comment_karma: number;
  created: number;
  created_utc: number;
  features: {
    awards_on_streams: boolean;
    chat_group_rollout: boolean;
    chat_subreddit: boolean;
    chat_user_settings: boolean;
    cookie_consent_banner: boolean;
    do_not_track: boolean;
    expensive_coins_package: boolean;
    is_email_permission_required: boolean;
    mod_awards: boolean;
    mod_service_mute_reads: boolean;
    mod_service_mute_writes: boolean;
    modlog_copyright_removal: boolean;
    mweb_link_tab: {
      experiment_id: number;
      owner: string;
      variant: string;
    };
    mweb_sharing_clipboard: {
      experiment_id: number;
      owner: string;
      variant: string;
    };
    mweb_xpromo_interstitial_comments_android: boolean;
    mweb_xpromo_interstitial_comments_ios: boolean;
    mweb_xpromo_modal_listing_click_daily_dismissible_android: boolean;
    mweb_xpromo_modal_listing_click_daily_dismissible_ios: boolean;
    mweb_xpromo_revamp_v3: {
      experiment_id: number;
      owner: string;
      variant: string;
    };
    noreferrer_to_noopener: boolean;
    premium_subscriptions_table: boolean;
    promoted_trend_blanks: boolean;
    resized_styles_images: boolean;
    show_amp_link: boolean;
    spez_modal: boolean;
    use_pref_account_deployment: boolean;
  };
  force_password_reset: boolean;
  gold_creddits: number;
  gold_expiration: null;
  has_android_subscription: boolean;
  has_external_account: boolean;
  has_gold_subscription: boolean;
  has_ios_subscription: boolean;
  has_mail: boolean;
  has_mod_mail: boolean;
  has_paypal_subscription: boolean;
  has_stripe_subscription: boolean;
  has_subscribed: boolean;
  has_subscribed_to_premium: boolean;
  has_verified_email: boolean;
  has_visited_new_profile: boolean;
  hide_from_robots: boolean;
  icon_img: string;
  id: string;
  in_beta: boolean;
  in_redesign_beta: boolean;
  inbox_count: number;
  is_blocked: boolean;
  is_employee: boolean;
  is_friend: boolean;
  is_gold: boolean;
  is_mod: boolean;
  is_sponsor: boolean;
  is_suspended: boolean;
  link_karma: number;
  modhash: null;
  name: string;
  new_modmail_exists: null;
  num_friends: number;
  over_18: boolean;
  password_set: boolean;
  pref_autoplay: boolean;
  pref_clickgadget: number;
  pref_geopopular: '';
  pref_nightmode: boolean;
  pref_no_profanity: boolean;
  pref_show_presence: boolean;
  pref_show_snoovatar: boolean;
  pref_show_trending: boolean;
  pref_show_twitter: boolean;
  pref_top_karma_subreddits: boolean;
  pref_video_autoplay: boolean;
  snoovatar_img: string;
  snoovatar_size: number;
  subreddit: {
    accept_followers: boolean;
    banner_img: string;
    banner_size: number;
    coins: number;
    community_icon: string;
    default_set: boolean;
    description: string;
    disable_contributor_requests: boolean;
    display_name: string;
    display_name_prefixed: string;
    free_form_reports: boolean;
    header_img: null | string;
    header_size: null | number;
    icon_color: string;
    icon_img: string;
    icon_size: [number, number];
    is_default_banner: boolean;
    is_default_icon: boolean;
    key_color: string;
    link_flair_enabled: boolean;
    link_flair_position: string;
    name: string;
    over_18: boolean;
    previous_names: [];
    primary_color: string;
    public_description: string;
    quarantine: boolean;
    restrict_commenting: boolean;
    restrict_posting: boolean;
    show_media: boolean;
    submit_link_label: string;
    submit_text_label: string;
    subreddit_type: string;
    subscribers: number;
    title: string;
    url: string;
    user_is_banned: boolean;
    user_is_contributor: boolean;
    user_is_moderator: boolean;
    user_is_muted: boolean;
    user_is_subscriber: boolean;
  };
  suspension_expiration_utc: null | number;
  total_karma: number;
  verified: boolean;
}
