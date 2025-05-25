import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, FONT_SIZES, BORDER_RADIUS } from '../../constants/theme';

const { width, height } = Dimensions.get('window');

const LoginScreen = ({ navigation }) => {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!phone || !password) {
      Alert.alert('Lỗi', 'Vui lòng nhập đầy đủ thông tin');
      return;
    }

    if (phone.length < 10) {
      Alert.alert('Lỗi', 'Số điện thoại không hợp lệ');
      return;
    }

    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      Alert.alert('Thành công', 'Đăng nhập thành công!', [
        {
          text: 'OK',
          onPress: () => navigation.replace('Main'),
        },
      ]);
    }, 1500);
  };

  const handleSocialLogin = (provider) => {
    Alert.alert('Thông báo', `Đăng nhập bằng ${provider} đang được phát triển`);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <LinearGradient
        colors={[COLORS.primary, COLORS.primaryDark]}
        style={styles.gradient}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          {/* Logo Section */}
          <View style={styles.logoContainer}>
            <View style={styles.logoCircle}>
              <Ionicons name="home" size={40} color={COLORS.textWhite} />
              <Text style={styles.logoSubText}>CARE</Text>
            </View>
            <Text style={styles.appTitle}>HOME CARE</Text>
            <Text style={styles.appSubtitle}>
              Dịch vụ chỉnh trang và sửa chữa tiện ích tại nhà
            </Text>
          </View>

          {/* Form Section */}
          <View style={styles.formContainer}>
            {/* Phone Input */}
            <View style={styles.inputRow}>
              <Ionicons 
                name="call-outline" 
                size={20} 
                color={COLORS.textSecondary} 
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.textInput}
                placeholder="Số điện thoại"
                value={phone}
                onChangeText={setPhone}
                keyboardType="phone-pad"
                maxLength={11}
                placeholderTextColor={COLORS.textSecondary}
              />
            </View>

            {/* Password Input */}
            <View style={styles.inputRow}>
              <Ionicons 
                name="lock-closed-outline" 
                size={20} 
                color={COLORS.textSecondary} 
                style={styles.inputIcon}
              />
              <TextInput
                style={[styles.textInput, { flex: 1 }]}
                placeholder="Mật khẩu"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                placeholderTextColor={COLORS.textSecondary}
              />
              <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)}
                style={styles.passwordToggle}
              >
                <Ionicons
                  name={showPassword ? 'eye-outline' : 'eye-off-outline'}
                  size={20}
                  color={COLORS.textSecondary}
                />
              </TouchableOpacity>
            </View>

            {/* Forgot Password */}
            <TouchableOpacity style={styles.forgotPassword}>
              <Text style={styles.forgotPasswordText}>Quên mật khẩu?</Text>
            </TouchableOpacity>

            {/* Login Button */}
            <TouchableOpacity
              style={[styles.loginButton, loading && styles.loginButtonDisabled]}
              onPress={handleLogin}
              disabled={loading}
            >
              <Text style={styles.loginButtonText}>
                {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
              </Text>
            </TouchableOpacity>

            {/* Divider */}
            <View style={styles.dividerContainer}>
              <View style={styles.divider} />
              <Text style={styles.dividerText}>Hoặc đăng nhập bằng</Text>
              <View style={styles.divider} />
            </View>

            {/* Social Login */}
            <View style={styles.socialContainer}>
              <TouchableOpacity
                style={[styles.socialButton, { backgroundColor: '#3b5998' }]}
                onPress={() => handleSocialLogin('Facebook')}
              >
                <Ionicons name="logo-facebook" size={24} color={COLORS.textWhite} />
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.socialButton, { backgroundColor: '#db4437' }]}
                onPress={() => handleSocialLogin('Google')}
              >
                <Ionicons name="logo-google" size={24} color={COLORS.textWhite} />
              </TouchableOpacity>
            </View>

            {/* Register Link */}
            <View style={styles.registerContainer}>
              <Text style={styles.registerText}>Chưa có tài khoản? </Text>
              <TouchableOpacity>
                <Text style={styles.registerLink}>Đăng ký ngay</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.xl,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: SPACING.xl,
  },
  logoCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.lg,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  logoSubText: {
    color: COLORS.textWhite,
    fontSize: FONT_SIZES.xs,
    fontWeight: 'bold',
    marginTop: 4,
  },
  appTitle: {
    fontSize: FONT_SIZES['3xl'],
    fontWeight: 'bold',
    color: COLORS.textWhite,
    marginBottom: SPACING.sm,
    textAlign: 'center',
  },
  appSubtitle: {
    fontSize: FONT_SIZES.md,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    lineHeight: 22,
  },
  formContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: BORDER_RADIUS['2xl'],
    padding: SPACING.xl,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 12,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.gray100,
    borderRadius: BORDER_RADIUS.xl,
    marginBottom: SPACING.md,
    paddingHorizontal: SPACING.md,
    height: 50,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  inputIcon: {
    marginRight: SPACING.sm,
  },
  textInput: {
    flex: 1,
    fontSize: FONT_SIZES.md,
    color: COLORS.textPrimary,
  },
  passwordToggle: {
    padding: SPACING.xs,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: SPACING.lg,
  },
  forgotPasswordText: {
    color: COLORS.primary,
    fontSize: FONT_SIZES.sm,
    fontWeight: '500',
  },
  loginButton: {
    backgroundColor: COLORS.primary,
    borderRadius: BORDER_RADIUS.xl,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.lg,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  loginButtonDisabled: {
    backgroundColor: COLORS.gray400,
  },
  loginButtonText: {
    color: COLORS.textWhite,
    fontSize: FONT_SIZES.lg,
    fontWeight: 'bold',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: SPACING.lg,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: COLORS.gray300,
  },
  dividerText: {
    color: COLORS.textSecondary,
    fontSize: FONT_SIZES.sm,
    marginHorizontal: SPACING.md,
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: SPACING.lg,
    marginBottom: SPACING.lg,
  },
  socialButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  registerText: {
    color: COLORS.textSecondary,
    fontSize: FONT_SIZES.md,
  },
  registerLink: {
    color: COLORS.primary,
    fontSize: FONT_SIZES.md,
    fontWeight: 'bold',
  },
});

export default LoginScreen;