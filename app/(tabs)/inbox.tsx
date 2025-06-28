import SearchBar from "@/components/inboxComponents/searchBar";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Pin } from "lucide-react-native";
import React, { useRef, useState } from "react";
import {
  Animated,
  Easing,
  FlatList,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

// Mock data for contacts
const mockContacts = [
  {
    id: "6",
    name: "Emma Watson",
    whatsappNumber: "+1555000006",
    lastMessage: "I'll send it over now.",
    lastMessagedAt: "2023-05-10T09:45:00Z",
    unreadMessagesCount: 3,
    pinned: false,
    spent: 142.3,
    labels: { data: [{ color: "#3498DB" }] },
  },
  {
    id: "7",
    name: "Liam Brown",
    whatsappNumber: "+1555000007",
    lastMessage: "Can you check the docs?",
    lastMessagedAt: "2023-05-10T08:15:00Z",
    unreadMessagesCount: 0,
    pinned: false,
    spent: 142.3,
    labels: { data: [] },
  },
  {
    id: "8",
    name: "Olivia Davis",
    whatsappNumber: "+1555000008",
    lastMessage: "Done! See you soon.",
    lastMessagedAt: "2023-05-09T17:05:00Z",
    unreadMessagesCount: 1,
    pinned: true,
    spent: 172.4,
    labels: { data: [{ color: "#F39C12" }] },
  },
  {
    id: "9",
    name: "Noah Wilson",
    whatsappNumber: "+1555000009",
    lastMessage: "Meeting moved to 4pm.",
    lastMessagedAt: "2023-05-09T15:00:00Z",
    unreadMessagesCount: 0,
    pinned: false,
    spent: 142.3,
    labels: { data: [] },
  },
  {
    id: "10",
    name: "Ava Martinez",
    whatsappNumber: "+1555000010",
    lastMessage: "Got it, thanks!",
    lastMessagedAt: "2023-05-08T14:30:00Z",
    unreadMessagesCount: 2,
    pinned: false,
    spent: 142.3,
    labels: { data: [{ color: "#1ABC9C" }] },
  },
  {
    id: "11",
    name: "William Garcia",
    whatsappNumber: "+1555000011",
    lastMessage: "Don't forget the report.",
    lastMessagedAt: "2023-05-08T12:45:00Z",
    unreadMessagesCount: 4,
    pinned: false,
    spent: 142.3,
    labels: { data: [] },
  },
  {
    id: "12",
    name: "Sophia Rodriguez",
    whatsappNumber: "+1555000012",
    lastMessage: "I’ll call you later.",
    lastMessagedAt: "2023-05-07T10:30:00Z",
    unreadMessagesCount: 0,
    pinned: true,
    spent: 172.4,
    labels: { data: [{ color: "#E74C3C" }] },
  },
  {
    id: "13",
    name: "James Lee",
    whatsappNumber: "+1555000013",
    lastMessage: "See you at lunch!",
    lastMessagedAt: "2023-05-07T09:00:00Z",
    unreadMessagesCount: 0,
    pinned: false,
    spent: 142.3,
    labels: { data: [] },
  },
  {
    id: "14",
    name: "Isabella Perez",
    whatsappNumber: "+1555000014",
    lastMessage: "Sure, that works for me.",
    lastMessagedAt: "2023-05-06T17:10:00Z",
    unreadMessagesCount: 1,
    pinned: false,
    spent: 142.3,
    labels: { data: [{ color: "#9B59B6" }] },
  },
  {
    id: "15",
    name: "Benjamin Harris",
    whatsappNumber: "+1555000015",
    lastMessage: "Let me know by EOD.",
    lastMessagedAt: "2023-05-06T13:45:00Z",
    unreadMessagesCount: 0,
    pinned: false,
    spent: 142.3,
    labels: { data: [] },
  },
  {
    id: "16",
    name: "Mia Clark",
    whatsappNumber: "+1555000016",
    lastMessage: "I'll get back to you.",
    lastMessagedAt: "2023-05-05T08:20:00Z",
    unreadMessagesCount: 2,
    pinned: false,
    spent: 142.3,
    labels: { data: [{ color: "#2ECC71" }] },
  },
  {
    id: "17",
    name: "Lucas Lewis",
    whatsappNumber: "+1555000017",
    lastMessage: "Almost done!",
    lastMessagedAt: "2023-05-04T10:10:00Z",
    unreadMessagesCount: 0,
    pinned: false,
    spent: 142.3,
    labels: { data: [] },
  },
  {
    id: "18",
    name: "Charlotte Young",
    whatsappNumber: "+1555000018",
    lastMessage: "Just landed.",
    lastMessagedAt: "2023-05-03T20:40:00Z",
    unreadMessagesCount: 1,
    pinned: true,
    spent: 172.4,
    labels: { data: [{ color: "#34495E" }] },
  },
  {
    id: "19",
    name: "Henry King",
    whatsappNumber: "+1555000019",
    lastMessage: "Happy birthday!",
    lastMessagedAt: "2023-05-03T11:25:00Z",
    unreadMessagesCount: 0,
    pinned: false,
    spent: 142.3,
    labels: { data: [] },
  },
  {
    id: "20",
    name: "Amelia Wright",
    whatsappNumber: "+1555000020",
    lastMessage: "Sending now.",
    lastMessagedAt: "2023-05-02T09:50:00Z",
    unreadMessagesCount: 3,
    pinned: false,
    spent: 142.3,
    labels: { data: [{ color: "#D35400" }] },
  },
  {
    id: "21",
    name: "Elijah Scott",
    whatsappNumber: "+1555000021",
    lastMessage: "Everything looks good.",
    lastMessagedAt: "2023-05-01T15:20:00Z",
    unreadMessagesCount: 0,
    pinned: false,
    spent: 142.3,
    labels: { data: [] },
  },
  {
    id: "22",
    name: "Harper Adams",
    whatsappNumber: "+1555000022",
    lastMessage: "Congrats!",
    lastMessagedAt: "2023-05-01T12:10:00Z",
    unreadMessagesCount: 1,
    pinned: false,
    spent: 142.3,
    labels: { data: [{ color: "#16A085" }] },
  },
  {
    id: "23",
    name: "Daniel Baker",
    whatsappNumber: "+1555000023",
    lastMessage: "I'll ping you later.",
    lastMessagedAt: "2023-04-30T14:30:00Z",
    unreadMessagesCount: 0,
    pinned: true,
    spent: 172.4,
    labels: { data: [] },
  },
  {
    id: "24",
    name: "Evelyn Gonzalez",
    whatsappNumber: "+1555000024",
    lastMessage: "See you soon!",
    lastMessagedAt: "2023-04-29T19:10:00Z",
    unreadMessagesCount: 2,
    pinned: false,
    spent: 142.3,
    labels: { data: [{ color: "#BDC3C7" }] },
  },
  {
    id: "25",
    name: "Matthew Nelson",
    whatsappNumber: "+1555000025",
    lastMessage: "Where are you?",
    lastMessagedAt: "2023-04-28T17:45:00Z",
    unreadMessagesCount: 0,
    pinned: false,
    spent: 142.3,
    labels: { data: [] },
  },
  {
    id: "26",
    name: "Abigail Carter",
    whatsappNumber: "+1555000026",
    lastMessage: "I'll let you know.",
    lastMessagedAt: "2023-04-27T13:55:00Z",
    unreadMessagesCount: 5,
    pinned: true,
    spent: 172.4,
    labels: { data: [{ color: "#F1C40F" }] },
  },
  {
    id: "27",
    name: "Sebastian Mitchell",
    whatsappNumber: "+1555000027",
    lastMessage: "Noted.",
    lastMessagedAt: "2023-04-26T10:20:00Z",
    unreadMessagesCount: 0,
    pinned: false,
    spent: 142.3,
    labels: { data: [] },
  },
  {
    id: "28",
    name: "Ella Roberts",
    whatsappNumber: "+1555000028",
    lastMessage: "Thank you!",
    lastMessagedAt: "2023-04-25T09:30:00Z",
    unreadMessagesCount: 0,
    pinned: false,
    spent: 142.3,
    labels: { data: [{ color: "#C0392B" }] },
  },
  {
    id: "29",
    name: "Jackson Turner",
    whatsappNumber: "+1555000029",
    lastMessage: "We’ll talk tomorrow.",
    lastMessagedAt: "2023-04-24T08:00:00Z",
    unreadMessagesCount: 2,
    pinned: false,
    spent: 142.3,
    labels: { data: [] },
  },
  {
    id: "30",
    name: "Grace Phillips",
    whatsappNumber: "+1555000030",
    lastMessage: "Email sent.",
    lastMessagedAt: "2023-04-23T16:25:00Z",
    unreadMessagesCount: 1,
    pinned: false,
    spent: 142.3,
    labels: { data: [{ color: "#7F8C8D" }] },
  },
  {
    id: "31",
    name: "Logan Campbell",
    whatsappNumber: "+1555000031",
    lastMessage: "I’m outside.",
    lastMessagedAt: "2023-04-22T18:40:00Z",
    unreadMessagesCount: 0,
    pinned: false,
    spent: 142.3,
    labels: { data: [] },
  },
  {
    id: "32",
    name: "Chloe Parker",
    whatsappNumber: "+1555000032",
    lastMessage: "See the attached doc.",
    lastMessagedAt: "2023-04-21T14:00:00Z",
    unreadMessagesCount: 4,
    pinned: true,
    spent: 172.4,
    labels: { data: [{ color: "#2980B9" }] },
  },
  {
    id: "33",
    name: "Alexander Evans",
    whatsappNumber: "+1555000033",
    lastMessage: "Yep, all good!",
    lastMessagedAt: "2023-04-20T12:00:00Z",
    unreadMessagesCount: 0,
    pinned: false,
    spent: 142.3,
    labels: { data: [] },
  },
  {
    id: "34",
    name: "Victoria Edwards",
    whatsappNumber: "+1555000034",
    lastMessage: "Approved ✅",
    lastMessagedAt: "2023-04-19T11:45:00Z",
    unreadMessagesCount: 0,
    pinned: false,
    spent: 142.3,
    labels: { data: [{ color: "#27AE60" }] },
  },
  {
    id: "35",
    name: "Jayden Collins",
    whatsappNumber: "+1555000035",
    lastMessage: "Working on it.",
    lastMessagedAt: "2023-04-18T13:10:00Z",
    unreadMessagesCount: 2,
    pinned: false,
    spent: 142.3,
    labels: { data: [] },
  },
];

export default function Inbox() {
  const [searchText, setSearchText] = useState("");
  const [searchedContacts, setSearchedContacts] = useState<any[] | null>(null);
  const [searchLoading, setSearchLoading] = useState(false);
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [theme] = useState("light");

  const animation = useRef(new Animated.Value(0)).current;
  const router = useRouter();

  const toggleSearch = () => {
    if (showSearchBar) {
      Animated.timing(animation, {
        toValue: 0,
        duration: 200,
        easing: Easing.ease,
        useNativeDriver: false,
      }).start(() => {
        setShowSearchBar(false);
        setSearchText("");
        setSearchedContacts(null);
      });
    } else {
      setShowSearchBar(true);
      Animated.timing(animation, {
        toValue: 1,
        duration: 200,
        easing: Easing.ease,
        useNativeDriver: false,
      }).start();
    }
  };

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const yesterday = new Date(now);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === now.toDateString()) {
      let hours = date.getHours();
      const minutes = String(date.getMinutes()).padStart(2, "0");
      const ampm = hours >= 12 ? "pm" : "am";
      hours = hours % 12 || 12;
      return `${hours}:${minutes} ${ampm}`;
    } else if (date.toDateString() === yesterday.toDateString()) {
      return "Yesterday";
    } else {
      const day = date.getDate();
      const monthNames = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];
      const month = monthNames[date.getMonth()];
      const year = date.getFullYear();

      const suffix =
        day === 1 || day === 21 || day === 31
          ? "st"
          : day === 2 || day === 22
            ? "nd"
            : day === 3 || day === 23
              ? "rd"
              : "th";

      return `${day}${suffix} ${month} ${year}`;
    }
  };

  const handleSearchChange = (text: string) => {
    setSearchText(text);
    if (text.length > 0) {
      setSearchLoading(true);
      // Simulate API call
      setTimeout(() => {
        const filtered = mockContacts.filter((contact) =>
          contact.name.toLowerCase().includes(text.toLowerCase())
        );
        setSearchedContacts(filtered);
        setSearchLoading(false);
      }, 300);
    } else {
      setSearchedContacts(null);
    }
  };

  const getBackgroundColor = (char: string) => {
    char = char.toUpperCase();
    if (/[A-C]/.test(char)) return "#FF6B6B";
    if (/[D-F]/.test(char)) return "#FF8C42";
    if (/[G-I]/.test(char)) return "#FFD700";
    if (/[J-L]/.test(char)) return "#4ECDC4";
    if (/[M-O]/.test(char)) return "#3498DB";
    if (/[P-R]/.test(char)) return "#8E44AD";
    if (/[S-T]/.test(char)) return "#F4D03F";
    if (/[U-V]/.test(char)) return "#2ECC71";
    if (/[W-X]/.test(char)) return "#E74C3C";
    if (/[Y-Z]/.test(char)) return "#95A5A6";
    return "#BDC3C7";
  };

  const handleNavigateToChatScreen = (contactData?: any) => {
    router.push({
      pathname: "/screens/chatScreens/chatScreen",
      params: contactData,
    });
  };

  const renderItem = ({ item: contact }: any) => {
    const backgroundColor = getBackgroundColor(contact?.name.charAt(0));

    return (
      <Pressable
        onPress={() => handleNavigateToChatScreen(contact)}
        style={{ paddingRight: 12 }}
      >
        <View
          style={{
            flexDirection: "row",
            gap: 12,
            alignItems: "center",
            marginTop: 16,
          }}
        >
          <View
            style={{
              width: 50,
              height: 50,
              borderRadius: 25,
              overflow: "hidden",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor,
            }}
          >
            <Text style={{ color: "white", fontWeight: "600", fontSize: 18 }}>
              {contact?.name.charAt(0)}
            </Text>
          </View>

          <View style={{ flex: 1 }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 8,
                flexWrap: "wrap",
              }}
            >
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "600",
                  flex: 1,
                  color: theme === "dark" ? "white" : "black",
                }}
                numberOfLines={1}
              >
                {contact?.name}
              </Text>
              {contact?.pinned && <Pin size={18} color={"gray"} />}
              {contact?.labels?.data.length > 0 && (
                <MaterialCommunityIcons
                  name="label"
                  size={18}
                  color={contact.labels.data[0].color}
                />
              )}
            </View>
            <Text
              style={{
                fontSize: 14,
                fontWeight: "600",
                flex: 1,
                color: theme === "dark" ? "white" : "black",
              }}
              numberOfLines={1}
            >
              {contact.lastMessage}
            </Text>
          </View>

          <View style={{ alignItems: "flex-end", flexShrink: 0 }}>
            <Text
              style={{
                fontSize: 12,
                color: theme === "dark" ? "white" : "#6B7280",
              }}
            >
              {formatDateTime(contact?.lastMessagedAt)}
            </Text>
            {contact?.unreadMessagesCount > 0 && (
              <View
                style={{
                  backgroundColor: "#22c065",
                  width: 20,
                  height: 20,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 10,
                  marginTop: 4,
                }}
              >
                <Text
                  style={{ fontSize: 12, color: "black", fontWeight: "600" }}
                >
                  {contact?.unreadMessagesCount > 9
                    ? "9+"
                    : contact?.unreadMessagesCount}
                </Text>
              </View>
            )}
          </View>
        </View>
      </Pressable>
    );
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StatusBar
        className="bg-white"
        backgroundColor={"white"}
        barStyle={"dark-content"}
      />
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: theme === "dark" ? "#1F2C34" : "#fff",
        }}
        className="pb-12"
      >
        {/* Header */}
        <View
          style={[
            styles.header,
            { backgroundColor: theme === "dark" ? "#1F2C34" : "#fff" },
          ]}
        >
          {!showSearchBar && (
            <View style={styles.headerContent}>
              <Text
                style={[
                  styles.headerTitle,
                  { color: theme === "dark" ? "white" : "black" },
                ]}
              >
                Inbox
              </Text>
              <TouchableOpacity onPress={toggleSearch}>
                <AntDesign
                  name="search1"
                  size={22}
                  color={theme === "dark" ? "white" : "black"}
                />
              </TouchableOpacity>
            </View>
          )}

          {/* Search Bar */}
          {showSearchBar && (
            <SearchBar
              theme={theme}
              searchText={searchText}
              searchLoading={searchLoading}
              animation={animation}
              onSearchChange={handleSearchChange}
              onClose={toggleSearch}
            />
          )}
        </View>

        {/* Contact List */}
        <View
          style={[
            styles.contactListContainer,
            { backgroundColor: theme === "dark" ? "#121B22" : "white" },
          ]}
        >
          <FlatList
            data={searchText ? searchedContacts || [] : mockContacts}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.flatListContent}
            ListEmptyComponent={
              <View style={styles.emptyContainer}>
                <View
                  style={[
                    styles.emptyIconContainer,
                    {
                      backgroundColor: theme === "dark" ? "#2D3748" : "#fff",
                    },
                  ]}
                >
                  <AntDesign
                    name={searchText ? "search1" : "contacts"}
                    size={40}
                    color={theme === "dark" ? "#A0AEC0" : "#9CA3AF"}
                  />
                </View>
                <Text
                  style={[
                    styles.emptyTitle,
                    { color: theme === "dark" ? "white" : "#374151" },
                  ]}
                >
                  {searchText ? "No Contacts Found" : "No Contacts"}
                </Text>
                <Text
                  style={[
                    styles.emptyText,
                    { color: theme === "dark" ? "#A0AEC0" : "#6B7280" },
                  ]}
                >
                  {searchText
                    ? "No contacts match your search. Try different keywords."
                    : "You do not have any contacts yet."}
                </Text>
              </View>
            }
            showsVerticalScrollIndicator={false}
          />
        </View>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  searchContainer: {
    width: "100%",
    paddingHorizontal: 15,
    paddingVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    overflow: "hidden",
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 8,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 0,
    fontSize: 16,
  },
  cancelButton: {
    marginLeft: 10,
  },
  header: {
    paddingTop: 0,
    backgroundColor: "white",
  },
  headerContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 0,
    backgroundColor: "white",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  contactListContainer: {
    flex: 1,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: "hidden",
  },
  flatListContent: {
    paddingHorizontal: 16,
    paddingBottom: 20,
    paddingTop: 10,
  },
  emptyContainer: {
    marginTop: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyIconContainer: {
    padding: 16,
    borderRadius: 9999,
  },
  emptyTitle: {
    marginTop: 16,
    fontSize: 18,
    fontWeight: "600",
  },
  emptyText: {
    marginTop: 4,
    fontSize: 14,
    textAlign: "center",
    width: "75%",
  },
});
